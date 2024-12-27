'use client';

import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/react';
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession(); // Use useSession to manage session data

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
            {/* <Link href="/"> */}
              <p>Guidebook</p>
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
              <button className="transparent text-base" type="button" disabled>
                {session.user.email}
              </button>
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

      <div className="page flex flex-col gap-8">
        
      </div>

      <div className="p-20"></div>
    </div>
  );
}
