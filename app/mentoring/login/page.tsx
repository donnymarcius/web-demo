import Link from 'next/link';
import React from 'react';
// import Image from "next/image";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <section className="banner">
        <h1 className="font-bold">Join as Mentor</h1>
        <p className="text-lg italic text-center">Gathering mentors and mentees across Indonesia to explore life science</p>
      </section>

      <div className="px-10 py-4 flex justify-between items-center">
        <div className="flex gap-2">
          <Link href="/mentoring">
            <p>Mentoring Home</p>
          </Link>
          <p>&gt;</p>
          {/* <Link href="/"> */}
            <p>Login</p>
          {/* </Link> */}
        </div>
        <div className="flex justify-end items-center gap-4">
          <Link href="/mentoring/join">
            <p className="font-medium hover:scale-110" style={{ color: 'var(--synbio-green)' }}>
              Join as Mentor✨
            </p>
          </Link>

          {/* <Link href="/mentoring/login">
            <button className="login" type="button">Login</button>
          </Link> */}
        </div>
      </div>

      <div className="page flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="border border-green-800 rounded-md px-2 py-1 w-64 text-gray-300 mx-auto">
            Username or email
          </div>
          <div className="border border-green-800 rounded-md px-2 py-1 w-64 text-gray-300 mx-auto">
            Password
          </div>
        </div>

        <div className="flex gap-2 mx-auto">
          <Link href="/mentoring/dashboard/mentor/profile">
            <button type="button">Login as Mentor</button>
          </Link>
          <Link href="/mentoring/dashboard/mentee/profile">
            <button type="button">Login as Mentee</button>
          </Link>
        </div>

        <p className="text-center">Not have an account? Register <u>here</u></p>
      </div>

      <div className="p-20"></div>
    </div>
  );
}
