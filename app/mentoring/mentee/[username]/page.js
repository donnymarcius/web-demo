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

export default function MenteeProfile({ params }) {
  const { data: session } = useSession();
  const username = use(params).username;
  const [mentee, setMentee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const role = session?.user?.role || ""; // Assumes role is set in session, default to empty string if not available
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/mentoring' }); // Triggers NextAuth logout functionality
  };

  useEffect(() => {
    console.log('Fetching for username:', username);
    const fetchMenteeData = async () => {
      try {
        const res = await fetch('/api/readMentee');
        const data = await res.json();
        const foundMentee = data.find((mentee) => mentee.username === username);
        if (foundMentee) {
          console.log('Found mentee:', foundMentee);  // Ensure mentor is found
          setMentee(foundMentee);
        } else {
          setError('Mentee not found');
        }
      } catch (err) {
        setError('Error fetching mentee data');
      } finally {
        setLoading(false); // Stop loading state after API call finishes
      }
    };

    if (username) {
      fetchMenteeData();
    }
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!mentee) return <div>Mentee not found</div>;

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
            <p>Mentee Profile</p>
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
          <div className="flex flex-col items-start">
            <div className="flex gap-2 items-center">
              <h1>{mentee.full_name}</h1>
              <Link href={`https://www.linkedin.com/in/${mentee.linkedin_username}`} target="_blank" rel="noopener noreferrer">
                <Image src="/images/icon/linkedin.png" alt="linkedin" width={100} height={100} className="w-10 ml-4" />
              </Link>
            </div>

            <p className="text-2xl font-medium" style={{ color: 'var(--synbio-green)' }}>
              {mentee.position} at {mentee.affiliation}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-6 w-1/2">
            <EditableField
              label="Field of Interest"
              icon="star"
              value={mentee.field_of_interest}
              isFoI={true}
            />

            <EditableField
              label="Education"
              icon="edu"
              value={mentee.almamater}
              isEdu={true}
            />
          </div>

          <div className="w-1/2">
            <EditableField
              label="Self Description"
              icon="note"
              value={mentee.description}
            />
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
