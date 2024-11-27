'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useSession } from 'next-auth/react'; // Import useSession to access user session data

export default function MentorProfile() {
  const { data: session, status } = useSession(); // Get session data
  const [mentorData, setMentorData] = useState(null); // To store mentor data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return; // If no session, don't fetch data
    const fetchMentorData = async () => {
      try {
        // Use the email from the session to fetch mentor data
        const response = await fetch(`/api/userMentor?email=${session.user.email}`);
        const data = await response.json();

        if (response.ok) {
          setMentorData(data);
        } else {
          console.error('Failed to fetch mentor data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching mentor data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorData();
  }, [session]); // Re-run the effect if session changes

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    // If no session, redirect to login page
    return <p>Please log in to view your profile.</p>;
  }

  if (loading) {
    return <p>Loading mentor data...</p>;
  }

  if (!mentorData) {
    return <p>Error loading mentor data. Please try again.</p>;
  }

  const { fullName } = mentorData; // Assuming API returns mentor data including 'fullName'

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
            <p>Profile</p>
          </div>
          <div className="flex justify-end items-center gap-4">
            <p className="text-white text-base">Hi, {fullName}</p>
          </div>
        </div>
      </div>

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

          <Link href="/mentoring/dashboard/mentor/schedule">
            <div className="side-menu-item">
              <Image 
                src="/images/icon/calendar-green.png"
                alt="Profile Icon"
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
                alt="Profile Icon"
                width={400}
                height={400}
                className="h-full w-auto"
              />
              <p>Manage Account</p>
            </div>
          </Link>
        </div>

        <div className="flex-1 min-w-96">
          <h2>Profile</h2>

          <div className="pl-4 py-2 flex gap-2 items-center">
            <h3 className="w-56">Profile Picture</h3>
            <Image 
              src="/images/placeholder_person.png"
              alt="Profile Picture"
              width={400}
              height={400}
              className="h-24 w-24 rounded-full"
              style={{ border: '2px solid var(--synbio-green)' }}
            />
            <Image 
              src="/images/icon/edit.png"
              alt="Edit Icon"
              width={400}
              height={400}
              className="h-8 w-8 rounded-lg p-1"
              style={{ background: 'var(--synbio-green)' }}
            />
          </div>

          <div className="pl-4 py-2 flex gap-2 items-center">
            <h3 className="w-56">Full Name</h3>
            <div className="border border-green-800 rounded-md px-2 py-1 w-96 text-gray-300">{fullName}</div>
            <Image 
              src="/images/icon/edit.png"
              alt="Edit Icon"
              width={400}
              height={400}
              className="h-8 w-8 rounded-lg p-1"
              style={{ background: 'var(--synbio-green)' }}
            />
          </div>

          {/* Display the email address */}
          <div className="pl-4 py-2 flex gap-2 items-center">
            <h3 className="w-56">Email</h3>
            <div className="border border-green-800 rounded-md px-2 py-1 w-96 text-gray-300">{session.user.email}</div>
          </div>

          {/* Other Profile Fields */}
        </div>
      </div>

      <div className="p-20"></div>
    </div>
  );
}
