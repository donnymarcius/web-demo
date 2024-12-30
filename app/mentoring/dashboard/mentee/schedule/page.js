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

// Fetch the mentor data from the readMentor API
const fetchMentors = async () => {
  try {
    const response = await fetch('/api/readMentor'); // Adjust the endpoint to your actual API
    if (!response.ok) throw new Error('Failed to fetch mentors');
    const mentors = await response.json();
    return mentors;
  } catch (error) {
    console.error('Error fetching mentors:', error);
    return [];
  }
};

// Function to get the appropriate class for session status text
const getStatusClass = (status) => {
  switch (status) {
    case 'Approved':
      return 'text-green-700'; // Green for Approved
    case 'Pending':
      return 'text-yellow-700'; // Yellow for Pending
    case 'Rejected':
      return 'text-red-700'; // Red for Rejected
    default:
      return 'text-white'; // Default grey color for unknown status
  }
};

const getStatusBG = (status) => {
  switch (status) {
    case 'Approved':
      return 'bg-green-50'; // Green for Approved
    case 'Pending':
      return 'bg-yellow-50'; // Yellow for Pending
    case 'Rejected':
      return 'bg-red-50'; // Red for Rejected
    default:
      return 'bg-white'; // Default grey color for unknown status
  }
};

export default function Home() {
  const { data: session } = useSession();
  const role = session?.user?.role || ""; // Assumes role is set in session, default to empty string if not available
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [mentors, setMentors] = useState([]);  // Store mentors data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/mentoring' }); // Triggers NextAuth logout functionality
  };

  useEffect(() => {
    // Fetch sessions and mentors when component loads
    const fetchSessionsData = async () => {
      if (!session || !session.user || !session.user.email) return;

      try {
        // Fetch sessions
        const response = await fetch('/api/updateSession', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`Error fetching sessions: ${response.statusText}`);
        }

        const sessionData = await response.json();
        
        // Filter sessions to only show the current user's mentee sessions
        const filteredSessions = sessionData.sessions?.filter(
          (sessionItem) => sessionItem.mentee_email === session.user.email
        );

        // Sort the sessions by session_date in ascending order
        const sortedSessions = filteredSessions.sort((a, b) => {
          const dateA = new Date(a.session_date);
          const dateB = new Date(b.session_date);
          return dateA - dateB;  // Sorts in ascending order
        });

        setSessions(sortedSessions || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchMentorsData = async () => {
      const mentorData = await fetchMentors();
      setMentors(mentorData);
    };

    fetchSessionsData();
    fetchMentorsData();
  }, [session]); // Refetch when session changes

  // Match the mentor name for each session
  const getMentorFullName = (mentorEmail) => {
    const mentor = mentors.find((m) => m.email === mentorEmail);
    return mentor ? mentor.full_name : 'Unknown Mentor';
  };

  const getMentorUsername = (mentorEmail) => {
    const mentor = mentors.find((m) => m.email === mentorEmail);
    return mentor ? mentor.username : 'Unknown Mentor';
  };

  const getMentorLinkedin = (mentorEmail) => {
    const mentor = mentors.find((m) => m.email === mentorEmail);
    return mentor ? mentor.linkedin_username : 'Unknown Mentor';
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
          <Link href="/mentoring/dashboard/mentee/profile">
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

          <Link href="/mentoring/dashboard/mentee/setting">
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
                            <p>Mentor:</p>
                            <Link href={`/mentoring/mentor/${getMentorUsername(session.mentor_email)}`} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                              {getMentorFullName(session.mentor_email)}
                            </Link>
                            

                            <Link href={`https://www.linkedin.com/in/${getMentorLinkedin(session.mentor_email)}`} target="_blank" rel="noopener noreferrer">
                              <Image src="/images/icon/linkedin.png" alt="linkedin" width={100} height={100} className="w-5" />
                            </Link>
                          </div>
                        </div>
                        {/* Add dynamic text color class for status */}
                        <p className={`text-lg font-bold ${getStatusClass(session.status)}`}>Status: {session.status}</p>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>

      <div className="p-20"></div>
    </div>
  );
}
