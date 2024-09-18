import Link from 'next/link';
import React from 'react';
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <section className="banner">
        <h1 className="font-bold">Mentoring Program</h1>
        <p className="text-lg italic text-center">Gathering mentors and mentees across Indonesia to explore life science</p>
      </section>

      <div className="px-10 py-4 flex justify-between items-center">
        <div className="flex gap-2">
          {/* <Link href="/mentoring"> */}
            <p>Mentoring Home</p>
          {/* </Link> */}
        </div>

        <div className="flex justify-end items-center gap-4">
          <Link href="/mentoring/join">
            <p className="font-medium hover:scale-110" style={{ color: 'var(--synbio-green)' }}>
              Join as Mentor✨
            </p>
          </Link>

          <Link href="/login">
            <button className="login">Login</button>
          </Link>
        </div>
      </div>

      <div className="page my-10 flex flex-col gap-10">
        <div className="flex gap-2 items-center justify-center">
          <Image 
            src="/images/mentoring/mascot.png"
            alt="Mascot"
            width={1007}
            height={1149}
            className="w-auto h-40"
          />
          <div className="max-w-[675px]">
            <h2>What is Synbio ID&apos;s Mentoring Program?</h2>
            <p>
              Synbio.ID&apos;s Mentoring Program seeks and matches experts 
              from various life science backgrounds to share their 
              knowledge and insights with 1-3 mentees to help them 
              pursue their careers and passions.
            </p>

            <div className="flex gap-2 mt-2">
              <Link href="/mentoring/explore">
                <button>Explore Mentor</button>
              </Link>
              <Link href="/mentoring/documentation">
                <button>Documentation</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="page my-8 flex flex-col gap-10 overflow-x-hidden">
        <div className="-mx-40 p-40 py-4" style={{ background: 'var(--light-green)' }}>
          <h2 className="text-center">Program Objective</h2>
          <div className="flex items-center justify-center gap-4 mt-4 text-center">
            <p className="flex-1 basis-1/2 rounded-lg py-3 px-4"  style={{ background: 'var(--lighter-green)' }}>
              Motivate mentees to develop and chase their potential in their desired area in a life science-related field.
            </p>
            <p className="flex-1 basis-1/3 rounded-lg py-3 px-4"  style={{ background: 'var(--lighter-green)' }}>
              Building valuable networks among mentors and mentees.
            </p>
          </div>
        </div>

        <div>
          <h2>Mentor Categories</h2>
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="flex-1 items-center gap-5 p-4 rounded-lg min-w-72" style={{ background: 'var(--lighter-green)' }}>
              <Image 
                src="/images/icon/school-green.png"
                alt="school"
                width={400}
                height={400}
                className="icon"
              />
              <div>
                <p className="text-lg font-bold">Academia</p>
                <p>The mentor works within the academic field (Example: researchers, lecturers, etc.)</p>
              </div>
            </div>

            <div className="flex-1 items-center gap-5 p-4 rounded-lg min-w-72" style={{ background: 'var(--lighter-green)' }}>
              <Image 
                src="/images/icon/company-green.png"
                alt="school"
                width={400}
                height={400}
                className="icon"
              />
              <div>
                <p className="text-lg font-bold">Company</p>
                <p>The mentor works within a life science-related company.</p>
              </div>
            </div>

            <div className="flex-1 items-center gap-5 p-4 rounded-lg min-w-72" style={{ background: 'var(--lighter-green)' }}>
              <Image 
                src="/images/icon/startup-green.png"
                alt="school"
                width={400}
                height={400}
                className="icon"
              />
              <div>
                <p className="text-lg font-bold">Start-Up</p>
                <p>The mentor works within a life science-related start-up.</p>
              </div>
            </div>

            <div className="flex-1 items-center gap-5 p-4 rounded-lg min-w-72" style={{ background: 'var(--lighter-green)' }}>
              <Image 
                src="/images/icon/bank-green.png"
                alt="school"
                width={400}
                height={400}
                className="icon"
              />
              <div>
                <p className="text-lg font-bold">Government</p>
                <p>The mentor works for a government agency or body (Example: Badan Riset dan Inovasi Nasional or BRIN).</p>
              </div>
            </div>

            <div className="flex-1 items-center gap-5 p-4 rounded-lg min-w-72" style={{ background: 'var(--lighter-green)' }}>
              <Image 
                src="/images/icon/school-green.png"
                alt="school"
                width={400}
                height={400}
                className="icon"
              />
              <div>
                <p className="text-lg font-bold">Indonesian Student Abroad</p>
                <p>The mentor is an Indonesian student majoring in life sciences who is currently or has ever studied abroad.</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-center">Testimony from Previous Batch</h2>
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
