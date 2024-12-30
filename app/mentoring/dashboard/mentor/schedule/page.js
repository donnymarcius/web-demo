'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from "next/image";

// Utility to format the session date and time
const formatSessionDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  return new Date(date).toLocaleDateString('en-US', options);
};

const formatSessionTime = (start_time, end_time) => {
  return `${start_time} - ${end_time} (GMT+7)`;
};

// Fetch the mentee data from the readMentee API
const fetchMentees = async () => {
  try {
    const response = await fetch('/api/readMentee');
    if (!response.ok) throw new Error('Failed to fetch mentees');
    const mentees = await response.json();
    return mentees;
  } catch (error) {
    console.error('Error fetching mentees:', error);
    return [];
  }
};

// Function to get the appropriate class for session status text
const getStatusClass = (status) => {
  switch (status) {
    case 'Approved':
      return 'text-green-700';
    case 'Pending':
      return 'text-yellow-700';
    case 'Rejected':
      return 'text-red-700';
    default:
      return 'text-white';
  }
};

const getStatusBG = (status) => {
  switch (status) {
    case 'Approved':
      return 'bg-green-50';
    case 'Pending':
      return 'bg-yellow-50';
    case 'Rejected':
      return 'bg-red-50';
    default:
      return 'bg-white';
  }
};

export default function Home() {
  const { data: session } = useSession();
  const role = session?.user?.role || "";
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState({ isVisible: false, action: '', session_id: '' });

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/mentoring' });
  };

  useEffect(() => {
    const fetchSessionsData = async () => {
      if (!session || !session.user || !session.user.email) return;

      try {
        const response = await fetch('/api/updateSession', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`Error fetching sessions: ${response.statusText}`);
        }

        const sessionData = await response.json();
        
        const filteredSessions = sessionData.sessions?.filter(
          (sessionItem) => sessionItem.mentor_email === session.user.email
        );

        const sortedSessions = filteredSessions.sort((a, b) => {
          const dateA = new Date(a.session_date);
          const dateB = new Date(b.session_date);
          return dateA - dateB;
        });

        setSessions(sortedSessions || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchMenteesData = async () => {
      const menteeData = await fetchMentees();
      setMentees(menteeData);
    };

    fetchSessionsData();
    fetchMenteesData();
  }, [session]);

  const getMenteeFullName = (menteeEmail) => {
    const mentee = mentees.find((m) => m.email === menteeEmail);
    return mentee ? mentee.full_name : 'Unknown Mentee';
  };

  const getMenteeUsername = (menteeEmail) => {
    const mentee = mentees.find((m) => m.email === menteeEmail);
    return mentee ? mentee.username : 'Unknown Mentee';
  };

  const getMenteeLinkedin = (menteeEmail) => {
    const mentee = mentees.find((m) => m.email === menteeEmail);
    return mentee ? mentee.linkedin_username : 'Unknown Mentee';
  };

  const handleStatusChange = async (status, session_id) => {
    const sessionToUpdate = sessions.find((s) => s.session_id === session_id);
    
    if (!sessionToUpdate) {
      console.error('Session not found');
      return;
    }
  
    const { mentor_email, mentee_email, session_date, start_time, end_time } = sessionToUpdate;
  
    try {
      const response = await fetch('/api/updateSessionStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id,
          mentor_email,    // Add mentor email
          mentee_email,    // Add mentee email
          session_date,    // Add session date
          start_time,      // Add start time
          end_time,        // Add end time
          status,          // Keep status
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update session status');
      }
  
      const updatedSession = await response.json();
      const updatedSessions = sessions.map((session) => 
        session.session_id === session_id ? { ...session, status: updatedSession.status } : session
      );
      setSessions(updatedSessions);
    } catch (error) {
      console.error(error);
    }
  };  

  const confirmAction = (action, session_id) => {
    setModal({ isVisible: true, action, session_id });
  };

  const handleConfirmModal = (confirm) => {
    if (confirm) {
      handleStatusChange(modal.action, modal.session_id);
    }
    setModal({ isVisible: false, action: '', session_id: '' });
  };

  return (
    <div className="overflow-x-hidden">
      {/* Background and Header */}
      <div className="relative h-[30vh]">
        <Image
          src="/images/mentoring/bg.png"
          alt="Background"
          fill
          className="absolute inset-0"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="absolute inset-0 px-10 flex justify-between items-end pb-4">
          <div className="flex gap-2 text-white">
            <Link href="/mentoring">
              <p>Mentoring Home</p>
            </Link>
            <p>&gt;</p>
            <p>Dashboard</p>
          </div>
          <div className="flex justify-end items-center gap-4">
            <Link href="/mentoring/join">
              <p className="font-medium hover:scale-110 text-white">
                Join as Mentor✨
              </p>
            </Link>

            {session ? (
              <div className="relative">
                <button
                  className="transparent text-base"
                  type="button"
                  onClick={toggleDropdown}
                >
                  {session.user.email}
                </button>
                {isDropdownOpen && (
                  <ul className="absolute right-0 text-black pr-2 rounded shadow-md">
                    <li>
                      <Link href={`/mentoring/dashboard/${role}/profile`}>
                        <button
                          className="transparent block text-sm w-full text-center rounded-none"
                          style={{ background: 'var(--synbio-green)' }}
                        >
                          Profile
                        </button>
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="transparent block text-sm w-full text-center rounded-none"
                        style={{ background: 'var(--synbio-green)' }}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Link href="/mentoring/login">
                <button className="transparent text-base" type="button">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="px-10 flex flex-wrap gap-8 mt-6">
      <div className="side-menu">
          <Link href="/mentoring/dashboard/mentor/profile">
            <div className="side-menu-item">
              <Image
                src="/images/icon/person-green.png"
                alt="Profile Icon"
                width={400}
                height={400}
                className="h-full w-auto"
              />
              <p>Profile</p>
            </div>
          </Link>

          <Link href="/mentoring/dashboard/mentor/available-sessions">
            <div className="side-menu-item">
              <Image
                src="/images/icon/avail-green.png"
                alt="Schedule Icon"
                width={400}
                height={400}
                className="h-full w-auto"
              />
              <p>Availability</p>
            </div>
          </Link>

          <div className="side-menu-item">
            <Image
              src="/images/icon/calendar-green.png"
              alt="Schedule Icon"
              width={400}
              height={400}
              className="h-full w-auto"
            />
            <p>Scheduled Sessions</p>
          </div>

          <Link href="/mentoring/dashboard/mentor/setting">
            <div className="side-menu-item">
              <Image
                src="/images/icon/setting-green.png"
                alt="Setting Icon"
                width={400}
                height={400}
                className="h-full w-auto"
              />
              <p>Manage Account</p>
            </div>
          </Link>
        </div>

        <div className="flex-1 min-w-96">
          <h2>Scheduled Sessions</h2>
          {loading ? (
            <p>Loading sessions...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <ul className="flex flex-col gap-2 mt-4">
              {sessions.length === 0 ? (
                <p>No available sessions yet</p>
              ) : (
                sessions.map((session, index) => (
                  <li key={index} className="flex justify-between items-center gap-x-4 space-y-2">
                    <div className={`schedule px-4 py-2 w-full ${getStatusBG(session.status)}`}>
                      <div className="flex justify-between">
                        <div className="flex flex-col">
                          <p>{`${formatSessionDate(session.session_date)} | ${formatSessionTime(session.start_time, session.end_time)}`}</p>
                          <div className="flex gap-2 items-center">
                            <p>Mentee:</p>
                            <Link href={`/mentoring/mentee/${getMenteeUsername(session.mentee_email)}`} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                              {getMenteeFullName(session.mentee_email)}
                            </Link>

                            <Link href={`https://www.linkedin.com/in/${getMenteeLinkedin(session.mentee_email)}`} target="_blank" rel="noopener noreferrer">
                              <Image src="/images/icon/linkedin.png" alt="linkedin" width={100} height={100} className="w-5" />
                            </Link>
                          </div>
                        </div>

                        <div className="justify-right">
                          <p className={`text-lg font-bold text-right ${getStatusClass(session.status)}`}>
                            Status: {session.status}
                          </p>

                          {session.status === 'Pending' ? (
                            <div className="flex gap-2 mt-1">
                              <button onClick={() => confirmAction('Approved', session.session_id)} className="btn-green">Approve</button>
                              <button onClick={() => confirmAction('Rejected', session.session_id)} className="btn-red">Reject</button>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-400">
                              {session.status === 'Approved' || session.status === 'Rejected' ? 
                                "Cancel this decision? Contact our admin." : null}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {modal.isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-lg">Are you sure?</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleConfirmModal(true)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => handleConfirmModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-20"></div>
    </div>
  );
}
