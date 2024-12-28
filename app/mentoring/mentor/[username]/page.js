'use client';

import { use, useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

// Reusable EditableField Component
const EditableField = ({ label, icon, value, isFoI = false, isEdu = false }) => {
  return (
    <fieldset className="profile-column px-4 pb-2">
      <legend>
        <div className="flex gap-1 items-start px-2">
          <Image src={`/images/icon/${icon}-green.png`} alt={`${icon}`} width={100} height={100} className="w-10 h-auto" />
          <h2>{label}</h2>
        </div>
      </legend>
      {isFoI ? (
        <div className="flex items-baseline gap-4">
          {value?.split(',').map((paragraph, index) => (
            <p key={index} className="text-center py-1 px-3 rounded-full" style={{ border: '1px solid var(--synbio-green)' }}>
              {paragraph}
            </p>
          ))}
        </div>
      ) : isEdu ? (
        value?.split('\n').map((paragraph, index) => (
          <div key={index} className="text-justify">
            <p>{paragraph}</p>
            {index < value.split('\n').length - 1 && (
              <hr className="my-1 border-t border-gray-200" />
            )}
          </div>
        ))
      ) : (
        value?.split('\n').map((paragraph, index) => (
          <p key={index} className="text-justify" style={{ marginBottom: '16px' }}>
            {paragraph}
          </p>
        ))
      )}
    </fieldset>
  );
};

export default function MentorProfile({ params }) {
  const { data: session } = useSession();
  const username = use(params).username;
  const [mentor, setMentor] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  const role = session?.user?.role || ""; // Assumes role is set in session, default to empty string if not available
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/mentoring' }); // Triggers NextAuth logout functionality
  };

  useEffect(() => {
    console.log('This is executed');
    const fetchMentorData = async () => {
      try {
        const res = await fetch('/api/readMentor');
        const data = await res.json();
        const foundMentor = data.find((mentor) => mentor.username === username);
        if (foundMentor) {
          console.log('Found mentor:', foundMentor);  // Ensure mentor is found
          setMentor(foundMentor);
          
          // Fetch sessions only after mentor is found
          fetchSessions(foundMentor.email);
          console.log("Found mentor email:", foundMentor.email);
        } else {
          setError('Mentor not found');
        }
      } catch (err) {
        setError('Error fetching mentor data');
      }
    };
  
    const fetchSessions = async (mentorEmail) => {
      console.log("Fetching sessions for mentor email:", mentorEmail);
      try {
        const response = await fetch('/api/getMentorSessions');
        
        if (!response.ok) {
          // If response isn't OK, log the status code
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Raw Sessions:', data);  // Log the raw response data
        
        if (!data || !data.sessions) {
          // If there's no sessions array in the data, log a warning
          console.error('No sessions found in response:', data);
        }
    
        // Assuming data.sessions is an array, filter for sessions matching mentor's email
        // console.log('mentor_email:', session.mentorEmail, 'mentorEmail:', mentorEmail);
        const filteredSessions = data.sessions?.filter(
          (session) => session.mentorEmail === mentorEmail
        );
        console.log('Filtered Sessions:', filteredSessions);  // Log the filtered sessions
    
        setSessions(filteredSessions);
      } catch (err) {
        // Catch errors and log them for debugging
        console.error('Error fetching sessions:', err);
        setError('Error fetching mentor sessions');
      } finally {
        setLoading(false);  // Hide the loading spinner in either case
      }
    };    
  
    if (username) {
      fetchMentorData();
    }
  }, [username]);
  

  const handleBooking = async () => {
    if (!selectedSession) {
      alert('No session selected!');
      return;
    }
  
    if (!session || !session.user || !session.user.email) {
      alert('Please log in first');
      return;
    }
  
    // Log the payload before sending
    console.log("Sending booking data:", {
      mentor_email: mentor.email, // Ensure this exists
      mentee_email: session.user.email, // Ensure this exists
      session_date: selectedSession.session_date, // Ensure this exists
      start_time: selectedSession.start_time, // Ensure this exists
      end_time: selectedSession.end_time, // Ensure this exists
      status: 'Pending', // This is hardcoded, ensure it's needed in the back-end
      created_at: new Date().toISOString(), // Use the current timestamp
    });
  
    try {
      const response = await fetch('/api/updateSession', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mentor_email: mentor.email,
          mentee_email: session.user.email,
          session_date: selectedSession.session_date,
          start_time: selectedSession.start_time,
          end_time: selectedSession.end_time,
          status: 'Pending',
          created_at: new Date().toISOString(),
        }),
      });
  
      const data = await response.json();
      if (data.message === 'Session updated successfully!') {
        alert('Session booked successfully');
        setShowModal(false);
      } else {
        alert('Error booking the session');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while booking the session');
    }
  };  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!mentor) return <div>Mentor not found</div>;

  return (
    <div className="overflow-x-hidden">
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
            <Link href="/mentoring/make-session">
              <p>Make Session</p>
            </Link>
            <p>&gt;</p>
            <p>Mentor Profile</p>
          </div>
          <div className="flex justify-end items-center gap-4">
            <Link href="/mentoring/join">
              <p className="font-medium hover:scale-110 text-white">
                Join as Mentor✨
              </p>
            </Link>

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

      <div className="page pt-4 flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <Image src={mentor.profile_picture} alt={`${mentor.full_name}'s profile`} width={150} height={150} className="w-40 h-40 object-cover rounded-full" />

          <div className="flex flex-col items-start">
            <div
              className="inline-block py-1 px-3 text-sm text-white font-medium rounded-full"
              style={{
                background: 'var(--synbio-green)',
              }}
            >
              {mentor.category}
            </div>

            <div className="flex gap-2 items-center">
              <h1>{mentor.full_name}</h1>
              <Link href={`https://www.linkedin.com/in/${mentor.linkedin_username}`} target="_blank" rel="noopener noreferrer">
                <Image src="/images/icon/linkedin.png" alt="linkedin" width={100} height={100} className="w-10 ml-4" />
              </Link>
            </div>

            <p className="text-2xl font-medium" style={{ color: 'var(--synbio-green)' }}>
              {mentor.role} at {mentor.affiliation}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-6 w-1/2">
            <EditableField
              label="Field of Interest"
              icon="star"
              value={mentor.field_of_interest}
              isFoI={true}
            />

            <EditableField
              label="Education"
              icon="edu"
              value={mentor.almamater}
              isEdu={true}
            />

            <EditableField
              label="Self Description"
              icon="note"
              value={mentor.description}
            />
          </div>

          <div className="w-1/2">
            <fieldset className="profile-column px-4 pb-4">
              <legend>
                <div className="flex gap-1 items-start px-2">
                  <Image src="/images/icon/schedule-green.png" alt="schedule icon" width={100} height={100} className="w-10 h-auto" />
                  <h2>Available Sessions</h2>
                </div>
              </legend>

              <div className="w-full my-4 text-center">
                {sessions.length === 0 ? (
                  <p>No available sessions yet</p>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {sessions.map((session, index) => (
                      <li key={index} className="flex justify-between items-center gap-x-4 space-y-2">
                        <div className="bg-green-100 rounded-full px-4 py-1">
                          {`${new Date(session.session_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })} | 
                              ${new Date(`1970-01-01T${session.start_time}:00Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                              ${new Date(`1970-01-01T${session.end_time}:00Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (GMT+7)`}

                        </div>
                        <button 
                          className="bg-blue-500 text-white px-4 py-2 rounded-full"
                          onClick={() => {
                            setSelectedSession(session); 
                            setShowModal(true);
                          }}
                        >
                          Book this session
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-lg">Are you sure you want to book this session?</p>
            <div className="flex gap-4 mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleBooking}
              >
                Yes
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
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
