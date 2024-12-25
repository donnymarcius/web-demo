'use client';

import Link from 'next/link';
import Image from "next/image";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Utility to generate time options
const generateTimeOptions = () => {
  const times = [];
  const startTime = new Date();
  startTime.setHours(7, 0, 0, 0); // 7 AM UTC+7
  const endTime = new Date();
  endTime.setHours(22, 0, 0, 0); // 10 PM UTC+7

  while (startTime <= endTime) {
    times.push({
      label: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      value: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    startTime.setMinutes(startTime.getMinutes() + 30);
  }

  return times;
};

// Utility to format the session date and time
const formatSessionDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  return new Date(date).toLocaleDateString('en-US', options);
};

const formatSessionTime = (start_time, end_time) => {
  const timeFormatter = (time) => {
    const [hour, minute] = time.split(':');
    const hourInt = parseInt(hour);
    const hour12 = hourInt % 12 === 0 ? 12 : hourInt % 12;
    return `${hour12}:${minute}`;
  };

  return `${timeFormatter(start_time)} - ${timeFormatter(end_time)} (UTC+7)`;
};

export default function AvailableSessions() {
  const { data: session, status } = useSession();
  const [sessions, setSessions] = useState([]); // Existing sessions
  const [newSession, setNewSession] = useState({ session_date: null, start_time: '', end_time: '' });
  const [temporarySessions, setTemporarySessions] = useState([]); // Temporarily stored sessions (not saved yet)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (status === "loading") return; // wait for session to load
    fetchSessions();
  }, [status]);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/getMentorSessions');
      const data = await response.json();
      setSessions(data.sessions); // Set only the current mentor's sessions
    } catch (err) {
      console.error(err);
      setError('Error fetching sessions');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSession = () => {
    if (!newSession.session_date) {
      setError('Please fill in the session date');
      setSuccessMessage('');
      return;
    }
  
    if (!newSession.start_time || !newSession.end_time) {
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
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="absolute inset-0"
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
            <p className="text-white font-bold">Hi, {session?.user?.name}!</p>
          </div>
        </div>
      </div>

      {/* Side Menu & Main Content */}
      <div className="px-10 flex flex-wrap gap-8 mt-6">
        <div className="side-menu">
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
                      {generateTimeOptions().map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
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
                      {generateTimeOptions().map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Add Session Button */}
                  <button onClick={handleAddSession} disabled={loading}>
                    Add Session
                  </button>
                  
                  <div>
                    {loading && <p>Loading...</p>}
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                  </div>
                </div>
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
