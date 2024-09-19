import Link from 'next/link';
import React from 'react';
import Image from "next/image";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <section className="banner">
        <h1 className="font-bold">Welcome, Name!</h1>
        <p className="text-lg italic text-center">Gathering mentors and mentees across Indonesia to explore life science</p>
      </section>

      <div className="px-10 py-4 flex justify-between items-center">
        <div className="flex gap-2">
          <Link href="/mentoring">
            <p>Mentoring Home</p>
          </Link>
          <p>&gt;</p>
          {/* <Link href="/"> */}
            <p>Mentee Dashboard</p>
          {/* </Link> */}
        </div>
        <div className="flex justify-end items-center gap-4">
          {/* <Link href="/mentoring/join">
            <p className="font-medium hover:scale-110" style={{ color: 'var(--synbio-green)' }}>
              Join as Mentor✨
            </p>
          </Link> */}

          {/* <Link href="/mentoring/login">
            <button className="login" type="button">Login</button>
          </Link> */}
        </div>
      </div>

      <div className="px-10 flex flex-wrap gap-8">
        <div className="side-menu">
          {/* <Link href="/mentoring/dashboard/mentee/profile"> */}
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
          {/* </Link> */}

          <Link href="/mentoring/dashboard/mentee/schedule">
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

          <Link href="/mentoring/dashboard/mentee/setting">
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
            <div className="border border-green-800 rounded-md px-2 py-1 w-96 text-gray-300">Lorem Ipsum</div>
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
            <h3 className="w-56">Education</h3>
            <div className="border border-green-800 rounded-md px-2 py-1 w-96 text-gray-300">Lorem Ipsum</div>
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
            <h3 className="w-56">Working Experience</h3>
            <div className="border border-green-800 rounded-md px-2 py-1 w-96 text-gray-300">Lorem Ipsum</div>
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
            <h3 className="w-56">Self Description</h3>
            <div className="border border-green-800 rounded-md px-2 py-1 w-96 text-gray-300 h-40">Lorem Ipsum</div>
            <Image 
              src="/images/icon/edit.png"
              alt="Edit Icon"
              width={400}
              height={400}
              className="h-8 w-8 rounded-lg p-1"
              style={{ background: 'var(--synbio-green)' }}
            />
          </div>
        </div>
      </div>

      <div className="p-20"></div>
    </div>
  );
}
