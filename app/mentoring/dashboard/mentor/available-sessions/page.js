'use client';

import Link from 'next/link';
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Static time options from 07:00 to 22:00
const timeOptions = [
  "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", 
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", 
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", 
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", 
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", 
  "22:00"
];

// Utility to format the session date and time
const formatSessionDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  return new Date(date).toLocaleDateString('en-US', options);
};

const formatSessionTime = (start_time, end_time) => {
  return `${start_time} - ${end_time} (GMT+7)`;
};

export default function AvailableSessions() {
  const { data: session, status } = useSession();
  const [sessions, setSessions] = useState([]); // Existing sessions
  const [newSession, setNewSession] = useState({ session_date: null, start_time: '07:00', end_time: '' });
  const [temporarySessions, setTemporarySessions] = useState([]); // Temporarily stored sessions (not saved yet)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [setSuccessMessage] = useState('');
  const role = session?.user?.role || ""; // Assumes role is set in session, default to empty string if not available
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/mentoring' }); // Triggers NextAuth logout functionality
  };
  

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/getMentorSessions');
      const data = await response.json();
  
      if (data && data.sessions) {
        const mentorEmail = session?.user?.email;  // Get the logged-in mentor's email
        console.log(mentorEmail);
        if (mentorEmail) {
          const filteredSessions = data.sessions.filter(session => session.mentorEmail === mentorEmail);
          setSessions(filteredSessions); // Only set sessions that belong to the logged-in mentor
        }
      } else {
        console.error('Error: No sessions in the response');
        setSessions([]); // Clear sessions if there are none
      }
    } catch (err) {
      console.error('Error fetching sessions:', err);
      setError('Error fetching sessions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "loading") return; // wait for session to load
    fetchSessions();
  }, [status]);

  const handleAddSession = () => {
    if (!newSession.session_date) {
      setError('Please fill in the session date');
      setSuccessMessage('');
      return;
    }
  
    if (!newSession.end_time) {
      setError('Please fill in start and end times');
      setSuccessMessage('');
      return;
    }
  
    const startTime = new Date(`1970-01-01T${newSession.start_time}:00Z`);
    const endTime = new Date(`1970-01-01T${newSession.end_time}:00Z`);
  
    // Ensure end time is after start time
    if (endTime <= startTime) {
      setError('End time must be later than start time');
      setSuccessMessage('');
      return;
    }
  
    const duration = (endTime - startTime) / (1000 * 60 * 60); // Calculate duration in hours
  
    // Ensure session duration is between 1 and 2 hours
    if (duration < 1 || duration > 2) {
      setError('Session duration must be between 1 and 2 hours');
      setSuccessMessage('');
      return;
    }
  
    // All validations passed, add to temporary sessions list
    setTemporarySessions([...temporarySessions, newSession]);
  
    // Clear input fields after adding the session
    setNewSession({ session_date: null, start_time: '', end_time: '' });
    setError('');
    setSuccessMessage('Session successfully added');
  };

  const handleRemoveSession = (session) => {
    // Remove the session from temporary session list
    setTemporarySessions(temporarySessions.filter(item => item !== session));
  };

  const handleSaveSessions = async () => {
    try {
      setLoading(true);
      setError('');

      const formattedSessions = temporarySessions.map(session => ({
        ...session,
        session_date: session.session_date.toISOString().split('T')[0], // Format session_date to YYYY-MM-DD
      }));

      for (let session of formattedSessions) {
        const payload = {
          action: 'add',
          availability: session,
        };

        console.log('Sending payload:', JSON.stringify(payload)); // Add debug log
        const response = await fetch('/api/updateAvailability', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const result = await response.json();
        if (!response.ok) {
          console.error(`Error response:`, result);
          throw new Error(result.error || response.statusText);
        }
      }

      setTemporarySessions([]); // Clear the temporary sessions after saving
      await fetchSessions(); // Fetch all sessions again, now including the new ones
      setSuccessMessage('All sessions saved successfully!');
    } catch (err) {
      setError(`Error saving sessions: ${err.message}`);
    } finally {
      setLoading(false);
    }
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

          {/* Check if the user is logged in, and display email or "Login" */}
          {session ? (
              // Dropdown Button for Logged-In User
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
                        <button className="transparent block text-sm w-full text-center rounded-none" style={{ background: 'var(--synbio-green)' }}>
                          Profile
                        </button>
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="transparent block text-sm w-full text-center rounded-none" style={{ background: 'var(--synbio-green)' }}
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

      {/* Side Menu & Main Content */}
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

          {/* <Link href="/mentoring/dashboard/mentor/available-sessions"> */}
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
          {/* </Link> */}

          <Link href="/mentoring/dashboard/mentor/schedule">
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
          </Link>

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
          <h2>Available Sessions</h2>

          <div>
            {/* Existing sessions */}
            <div className="w-full my-4">
              <fieldset className="profile-column px-4 pb-4">
                <legend>
                  <div className="flex gap-1 items-start px-2">
                    <h3 className="text-2xl mb-2">Existing Sessions</h3>
                  </div>
                </legend>
                {temporarySessions.length === 0 && sessions.length === 0 ? (
                  <p>No available sessions yet</p>
                ) : (
                  <ul className="flex flex-wrap gap-2">
                    {sessions.map((session, index) => (
                      <li key={index} className="flex justify-between items-center gap-x-4 space-y-2">
                        <div className="bg-green-100 rounded-full px-4 py-1">
                          {`${formatSessionDate(session.session_date)} | ${formatSessionTime(session.start_time, session.end_time)}`}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </fieldset>
            </div>

            <div className="flex gap-8 justify-center">
              {/* Add New Session */}
              <div className="flex flex-col">
                <h3 className="text-2xl mb-2">Add New Session</h3>
                <div className="flex flex-col gap-4">
                  {/* Date Picker */}
                  <div className="flex justify-between gap-4">
                    <label htmlFor="session_date">Session Date</label>
                    <DatePicker
                      id="session_date"
                      selected={newSession.session_date}
                      onChange={(date) => setNewSession({ ...newSession, session_date: date })}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select a date"
                      className="w-28 text-center"
                    />
                  </div>

                  {/* Start Time Dropdown */}
                  <div className="flex justify-between">
                    <label htmlFor="start_time">Start Time</label>
                    <select
                      id="start_time"
                      value={newSession.start_time}
                      onChange={(e) => setNewSession({ ...newSession, start_time: e.target.value })}
                      disabled={loading}
                    >
                      {timeOptions.map(time => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* End Time Dropdown */}
                  <div className="flex justify-between">
                    <label htmlFor="end_time">End Time</label>
                    <select
                      id="end_time"
                      value={newSession.end_time}
                      onChange={(e) => setNewSession({ ...newSession, end_time: e.target.value })}
                      disabled={loading}
                    >
                      {timeOptions.map(time => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Add Session Button */}
                  <button onClick={handleAddSession} disabled={loading}>
                    Add Session
                  </button>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}
              </div>

              {/* List of new sessions */}
              <div className="w-1/2">
                <fieldset className="profile-column px-4 pb-4">
                  <legend>
                    <div className="flex gap-1 items-start px-2">
                      <h3 className="text-2xl mb-2">List of New Sessions</h3>
                    </div>
                  </legend>
                  {temporarySessions.length === 0 ? (
                    <p>Choose and add a new session from the left section</p>
                  ) : (
                    <ul>
                      {temporarySessions.map((session, index) => (
                        <li key={index} className="flex justify-between items-center gap-x-4 space-y-2">
                          <div>
                            {`${formatSessionDate(session.session_date)} | ${formatSessionTime(session.start_time, session.end_time)}`}
                          </div>
                          <button onClick={() => handleRemoveSession(session)}>Remove</button>
                        </li>
                      ))}
                    </ul>
                  )}
                </fieldset>

                {/* Save & Clear Button */}
                {(temporarySessions.length > 0) && (
                  <div className="flex justify-center gap-4 p-4">
                    <button onClick={handleSaveSessions} disabled={loading}>
                      Save Sessions
                    </button>
                    <button onClick={() => setTemporarySessions([])} disabled={loading}>
                      Clear
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-20"></div>
    </div>
  );
}
