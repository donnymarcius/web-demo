'use client'; // Mark this component as a client-side component

import Link from 'next/link';
import Image from "next/image";
import { useEffect, useState } from 'react';
import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Verify() {
  const [status, setStatus] = useState('Verifying your email...');
  const router = useRouter();
  const [token, setToken] = useState(null);

  const { data: session } = useSession(); // Use useSession to manage session data
  const role = session?.user?.role || ""; // Assumes role is set in session, default to empty string if not available
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    signOut(); // Triggers NextAuth logout functionality
  };
  
  // Extract the token from the URL query string
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const queryParams = new URLSearchParams(window.location.search);
      const tokenFromUrl = queryParams.get('token');
      setToken(tokenFromUrl);
    }
  }, []);

  // Call the /api/verifyEmail endpoint to validate the token
  useEffect(() => {
    if (token) {
      const verifyToken = async () => {
        try {
          const response = await fetch('/api/verifyEmail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }), // Send token to the API
          });

          const result = await response.json();

          if (response.ok) {
            setStatus('Email verified successfully! Redirecting to login...');
            setTimeout(() => router.push('/mentoring/login'), 3000); // Redirect after 3 seconds
          } else {
            setStatus(result.message || 'Verification failed. Please try again.');
          }
        } catch (error) {
          setStatus('An error occurred while verifying your email. Please try again later.');
        }
      };

      verifyToken();
    }
  }, [token, router]);

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
            {/* <Link href="/"> */}
              <p>Verification</p>
            {/* </Link> */}
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

      <div className="page flex flex-col mt-4 items-center">
        <h2>Email Verification</h2>
        <p>{status}</p>
      </div>

      <div className="p-20"></div>
    </div>
  );
}
