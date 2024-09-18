// import Link from 'next/link';
import React from 'react';
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <section className="banner">
        <h1 className="font-bold">Mentoring Program</h1>
        <p className="text-lg italic">Gathering mentors and mentees across Indonesia to explore life science</p>
      </section>

      <div className="page my-8 flex flex-col gap-10">
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
              {/* <Link href="/"> */}
                <button>Explore Mentor</button>
              {/* </Link> */}
              {/* <Link href="/"> */}
                <button>Program Documentation</button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>

      <div className="page my-8 flex flex-col gap-10">
        <div>
          <h2 className="text-right">Program Objective</h2>
          <div className="flex items-center justify-end gap-4 mt-4">
            <div className="flex gap-2 rounded-lg p-4 w-80" style={{ background: 'var(--light-green)' }}>
              <Image 
                src="/images/logo/bulb-green.png"
                alt="idea"
                width={40}
                height={40}
                className="w-12 h-12"
              />
              <p className="mt-4">Motivate mentees to develop and chase their potential in their desired area in a life science-related field</p>
            </div>
            <div className="flex gap-2 rounded-lg p-4 w-52" style={{ background: 'var(--light-green)' }}>
              <Image 
                src="/images/logo/globe-green.png"
                alt="idea"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <p className="mt-4">Building valuable networks among mentors and mentees</p>
            </div>
          </div>
        </div>

        <div>
          <h2>Mentor Categories</h2>
          <div className="flex flex-wrap gap-x-16 gap-y-2 mt-4">
            <div className="flex items-center gap-4">
              <Image 
                src="/images/logo/school-green.png"
                alt="school"
                width={400}
                height={400}
                className="w-12 h-12"
              />
              <p className="text-2xl font-bold" style={{ color: 'var(--synbio-green)' }}>
                Academia
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Image 
                src="/images/logo/company-green.png"
                alt="school"
                width={400}
                height={400}
                className="w-12 h-12"
              />
              <p className="text-2xl font-bold" style={{ color: 'var(--synbio-green)' }}>
                Company
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Image 
                src="/images/logo/startup-green.png"
                alt="school"
                width={400}
                height={400}
                className="w-12 h-12"
              />
              <p className="text-2xl font-bold" style={{ color: 'var(--synbio-green)' }}>
                Start-Up
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Image 
                src="/images/logo/bank-green.png"
                alt="school"
                width={400}
                height={400}
                className="w-12 h-12"
              />
              <p className="text-2xl font-bold" style={{ color: 'var(--synbio-green)' }}>
                Government
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Image 
                src="/images/logo/school-green.png"
                alt="school"
                width={400}
                height={400}
                className="w-12 h-12"
              />
              <p className="text-2xl font-bold" style={{ color: 'var(--synbio-green)' }}>
                Indonesian Student Abroad
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-center">Testimony</h2>
          <div className="flex gap-4">
            <div className="box">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
            <div className="box">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
            <div className="box">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
          </div>
        </div>

        <div className="ml-52 text-right">
          <h2>First Batch Synbio ID Mentoring</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna 
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
            ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>

      <div className="p-20"></div>
    </div>
  );
}
