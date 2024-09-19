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
            <p>Mentor Dashboard</p>
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

          {/* <Link href="/mentoring/dashboard/mentor/schedule"> */}
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
          {/* </Link> */}

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
          <h2>Scheduled Sessions</h2>

          <div className="flex flex-col gap-4 mt-4">
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
          </div>
        </div>
      </div>

      <div className="p-20"></div>
    </div>
  );
}
