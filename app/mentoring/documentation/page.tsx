// import Link from 'next/link';
import React from 'react';
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <section className="banner">
        <h1 className="font-bold">Previous Batches</h1>
        <p className="text-lg italic">Gathering mentors and mentees across Indonesia to explore life science</p>
      </section>

      <div className="page my-8 flex flex-col gap-10">
        <div className="-mx-40 p-40 py-6" style={{ background: 'var(--lighter-green)' }}>
          <div className="flex justify-between gap-10">
            <div className="flex-1">
              <h2>First Batch</h2>
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

        <div className="-mx-40 p-40 py-6" style={{ background: 'var(--lighter-green)' }}>
          <div className="flex justify-between gap-10">
            <div className="flex-1">
              <h2>Second Batch</h2>
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