'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession(); // Use useSession to manage session data
  const role = session?.user?.role || ""; // Assumes role is set in session, default to empty string if not available
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/mentoring' }); // Triggers NextAuth logout functionality
  };

  return (
    <div className="overflow-x-hidden">
      <div className="relative h-[30vh]">
        <Image
          src="/images/mentoring/bg.png"
          alt="Background"
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
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

          {/* <Link href="/mentoring/dashboard/mentor/schedule"> */}
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
          {/* </Link> */}

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

          {/* <div className="flex flex-col gap-4 mt-4">
            <div className="bg-green-100 px-4 py-2 rounded-lg">
              <div className="flex justify-between font-bold text-xl">
                <h4>Friday, Sep 20, 2024</h4>
                <h4 className="text-green-800">Approved</h4>
              </div>

              <div className="flex justify-between">
                <div className="mt-2 px-4 py-2 flex flex-col gap-2">
                  <p>Time: 09:00 - 11:00 WIB</p>
                  <div className="flex gap-4 items-center">
                    <p>Mentee: Lorem Ipsum</p>
                    <div className="py-1 px-2 rounded-lg flex gap-2 text-white items-center" style={{ background: 'var(--synbio-green)' }}>
                      <p>Mentee Profile</p>
                      <Image 
                        src="/images/icon/doc.png"
                        alt="Documen Icon"
                        width={400}
                        height={400}
                        className="w-5 h-5"
                      />
                    </div>
                  </div>
                  <p>Link: <u>https:</u></p>
                </div>
                <p className="text-gray-300 underline">Cancel?</p>
              </div>
            </div>

            <div className="bg-yellow-100 px-4 py-2 rounded-lg">
              <div className="flex justify-between font-bold text-xl">
                <h4>Friday, Sep 20, 2024</h4>
                <h4 className="text-yellow-800">Pending</h4>
              </div>

              <div className="flex justify-between">
                <div className="mt-2 px-4 py-2 flex flex-col gap-2">
                  <p>Time: 09:00 - 11:00 WIB</p>
                  <div className="flex gap-4 items-center">
                    <p>Mentee: Lorem Ipsum</p>
                    <div className="py-1 px-2 rounded-lg flex gap-2 text-white items-center" style={{ background: 'var(--synbio-green)' }}>
                      <p>Mentee Profile</p>
                      <Image 
                        src="/images/icon/doc.png"
                        alt="Documen Icon"
                        width={400}
                        height={400}
                        className="w-5 h-5"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <div className="h-8 px-2 flex items-center rounded-lg bg-green-800 text-white">Approve</div>
                  <div className="h-8 px-2 flex items-center rounded-lg bg-red-800 text-white">Reject</div>
                </div>
              </div>
            </div>

            <div className="bg-red-100 px-4 py-2 rounded-lg">
              <div className="flex justify-between font-bold text-xl">
                <h4>Friday, Sep 20, 2024</h4>
                <h4 className="text-red-800">Rejected</h4>
              </div>

              <div className="flex justify-between">
                <div className="mt-2 px-4 py-2 flex flex-col gap-2">
                  <p>Time: 09:00 - 11:00 WIB</p>
                  <div className="flex gap-4 items-center">
                    <p>Mentee: Lorem Ipsum</p>
                    <div className="py-1 px-2 rounded-lg flex gap-2 text-white items-center" style={{ background: 'var(--synbio-green)' }}>
                      <p>Mentee Profile</p>
                      <Image 
                        src="/images/icon/doc.png"
                        alt="Documen Icon"
                        width={400}
                        height={400}
                        className="w-5 h-5"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 underline">Cancel?</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className="p-20"></div>
    </div>
  );
}
