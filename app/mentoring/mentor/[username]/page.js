// app/mentoring/mentor/[username]/page.js

'use client'; // Mark as client-side rendered if necessary

import { useEffect, useState } from 'react';
import { use } from 'react';
import Link from 'next/link';
import Image from "next/image";

// Reusable EditableField Component
const EditableField = ({ label, icon, value, isFoI = false, isEdu = false }) => {
  return (
    <fieldset className="profile-column px-4 pb-2">
      <legend>
        <div className="flex gap-1 items-start px-2">
          <img src={`/images/icon/${icon}-green.png`} alt={`${icon}`} width={100} height={100} className="w-10 h-auto" />
          <h2>{label}</h2>
        </div>
      </legend>

      {isFoI ?(
        <div className="flex gap-4">
          {value?.split(',').map((paragraph, index) => (
            <p key={index} className="text-justify py-1 px-3 rounded-full" style={{ border: '1px solid var(--synbio-green)' }}>
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
  // Unwrap the params object using `use()` to access the username
  const username = use(params).username;

  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const res = await fetch('/api/readMentor');
        const data = await res.json();

        // Find the mentor based on the 'username'
        const foundMentor = data.find((mentor) => mentor.username === username);
        if (foundMentor) {
          setMentor(foundMentor);
        } else {
          setError('Mentor not found');
        }
      } catch (err) {
        setError('Error fetching mentor data');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchMentorData();
    }
  }, [username]); // Dependency on 'username', so it will re-run when the username changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!mentor) return <div>Mentor not found</div>;

  return (
    <div className="overflow-x-hidden">
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
            <Link href="/mentoring/make-session">
              <p>Make Session</p>
            </Link>
            <p>&gt;</p>
            {/* <Link href="/"> */}
              <p>Mentor Profile</p>
            {/* </Link> */}
          </div>
          <div className="flex justify-end items-center gap-4">
            <Link href="/mentoring/join">
              <p className="font-medium hover:scale-110 text-white">
                Join as Mentor✨
              </p>
            </Link>

            <Link href="/mentoring/login">
              <button className="transparent text-base" type="button">Login</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="page pt-4 flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <img src={mentor.profile_picture} alt={`${mentor.full_name}'s profile`} width={150} height={150} className="w-40 h-40 object-cover rounded-full"/>

          <div className="flex flex-col items-start"> {/* Use items-start to prevent stretching */}
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
              <img src={`/images/icon/gender-${mentor.gender}.png`} alt="gender" width={100} height={200} className="w-auto h-8 mb-8" />
              <Link href={`https://www.linkedin.com/in/${mentor.linkedin_username}`} target="_blank" rel="noopener noreferrer">
                <img src="/images/icon/linkedin.png" alt="linkedin" width={100} height={100} className="w-10 ml-4" />
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
                  <img src="/images/icon/schedule-green.png" alt="schedule icon" width={100} height={100} className="w-10 h-auto" />
                  <h2>Available Sessions</h2>
                </div>
              </legend>

              {/* <p className="text-xl font-medium pb-2">January 6th, 2025</p>
              <div className="flex gap-2">
                <p className="profile-column py-1 px-2">09:00 WIB</p>
                <p className="profile-column py-1 px-2">12:00 WIB</p>
              </div>
              <hr className="my-4 border-t border-gray-200" />
              <p className="text-xl font-medium pb-2">January 8th, 2025</p>
              <div className="flex gap-2">
                <p className="profile-column py-1 px-2">13:00 WIB</p>
                <p className="profile-column py-1 px-2">14:00 WIB</p>
                <p className="profile-column py-1 px-2">16:00 WIB</p>
              </div>
              <hr className="my-4 border-t border-gray-200" /> */}

              <div className="flex justify-center">
                <div
                  className="inline-block py-1 px-3 text-xl text-white font-medium rounded-lg mt-4 cursor-pointer"
                  style={{
                    background: 'var(--synbio-green)',
                  }}
                >
                  Make a Mentoring Session
                </div>
              </div>
              
            </fieldset>
          </div>
        </div>
      </div>

      <div className="p-20"></div>
    </div>
  );
}
