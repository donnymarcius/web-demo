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
              <p>Documentation</p>
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

      <div className="page flex flex-col gap-4">
        <div className="-mx-40 px-40 py-6" style={{ background: 'var(--lighter-green)' }}>
          <div className="flex justify-between gap-10">
            <div className="flex-1">
              <h2>First Batch</h2>
              <p className="font-medium mb-4">December 2023 - January 2024</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>

            <ul className="flex gap-4 text-center" style={{ color: 'var(--synbio-green)' }}>
              <li>
                <p className="font-bold text-3xl">97</p>
                <p className="">Mentors</p>
              </li>
              <li>
                <p className="font-bold text-3xl">159</p>
                <p className="">Mentees</p>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-center">Testimony from First Batch</h2>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="box flex-1 min-w-64">
              <p className="text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="flex justify-end items-center gap-2 font-bold text-lg mt-2" style={{ color: 'var(--synbio-green)' }}>
                <p>Mentee Name</p>
                <Image 
                  src="/images/icon/person-green.png"
                  alt="person"
                  width={40}
                  height={40}
                  className="w-8 h-8"
                />
              </div>
            </div>
            
            <div className="box flex-1 min-w-64">
              <p className="text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="flex justify-end items-center gap-2 font-bold text-lg mt-2" style={{ color: 'var(--synbio-green)' }}>
                <p>Mentee Name</p>
                <Image 
                  src="/images/icon/person-green.png"
                  alt="person"
                  width={40}
                  height={40}
                  className="w-8 h-8"
                />
              </div>
            </div>

            <div className="box flex-1 min-w-64">
              <p className="text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="flex justify-end items-center gap-2 font-bold text-lg mt-2" style={{ color: 'var(--synbio-green)' }}>
                <p>Mentee Name</p>
                <Image 
                  src="/images/icon/person-green.png"
                  alt="person"
                  width={40}
                  height={40}
                  className="w-8 h-8"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="-mx-40 px-40 py-6 mt-10" style={{ background: 'var(--lighter-green)' }}>
          <div className="flex justify-between gap-10">
            <div className="flex-1">
              <h2>Second Batch</h2>
              <p className="font-medium mb-4">December 2023 - January 2024</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>

            <ul className="flex gap-4 text-center" style={{ color: 'var(--synbio-green)' }}>
              <li>
                <p className="font-bold text-3xl">97</p>
                <p className="">Mentors</p>
              </li>
              <li>
                <p className="font-bold text-3xl">159</p>
                <p className="">Mentees</p>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-center">Testimony from Second Batch</h2>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="box flex-1 min-w-64">
              <p className="text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="flex justify-end items-center gap-2 font-bold text-lg mt-2" style={{ color: 'var(--synbio-green)' }}>
                <p>Mentee Name</p>
                <Image 
                  src="/images/icon/person-green.png"
                  alt="person"
                  width={40}
                  height={40}
                  className="w-8 h-8"
                />
              </div>
            </div>
            
            <div className="box flex-1 min-w-64">
              <p className="text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="flex justify-end items-center gap-2 font-bold text-lg mt-2" style={{ color: 'var(--synbio-green)' }}>
                <p>Mentee Name</p>
                <Image 
                  src="/images/icon/person-green.png"
                  alt="person"
                  width={40}
                  height={40}
                  className="w-8 h-8"
                />
              </div>
            </div>

            <div className="box flex-1 min-w-64">
              <p className="text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="flex justify-end items-center gap-2 font-bold text-lg mt-2" style={{ color: 'var(--synbio-green)' }}>
                <p>Mentee Name</p>
                <Image 
                  src="/images/icon/person-green.png"
                  alt="person"
                  width={40}
                  height={40}
                  className="w-8 h-8"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-20"></div>
    </div>
  );
}
