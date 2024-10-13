import Link from 'next/link';
import React from 'react';
import Image from "next/image";

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
            <p>Join as Mentor</p>
          {/* </Link> */}
        </div>
        <div className="flex justify-end items-center gap-4">
          {/* <Link href="/mentoring/join">
            <p className="font-medium hover:scale-110" style={{ color: 'var(--synbio-green)' }}>
              Join as Mentor✨
            </p>
          </Link> */}

          <Link href="/mentoring/login">
            <button className="login" type="button">Login</button>
          </Link>
        </div>
      </div>

      <div className="page flex flex-col gap-8">
        <div>
          <h2>Why join us as a mentor?</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          
          <div className="flex justify-center">
            {/* <a href="/" target="_blank" rel="noopener noreferrer"> */}
              <button className="white font-medium text-xl mt-6" type="button">Click Here to Register as Mentor</button>
            {/* </a> */}
          </div>
        </div>

        <div className="flex gap-4 justify-center items-center">
          <div className="w-64 text-center">
            <Image 
              src="/images/icon/bulb-green.png"
              alt="idea"
              width={400}
              height={400}
              className="w-16 h-16 mb-4 mx-auto"
            />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>

          <div className="w-64 text-center">
            <Image 
              src="/images/icon/book-green.png"
              alt="idea"
              width={400}
              height={400}
              className="w-16 h-16 mb-4 mx-auto"
            />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>

          <div className="w-64 text-center">
            <Image 
              src="/images/icon/globe-green.png"
              alt="idea"
              width={400}
              height={400}
              className="w-16 h-16 mb-4 mx-auto"
            />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>

        </div>

        <div>
          <h2 className="text-center">Testimony from Other Mentors</h2>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="box flex-1 min-w-96">
              <p className="text-justify">
              Ide Program ini sangat diperlukan dan sangat bermanfaat untuk banyak orang.
              </p>
              <div className="flex justify-end items-center gap-2 font-bold text-lg mt-2" style={{ color: 'var(--synbio-green)' }}>
                <p>Aisyah Nur</p>
                <Image 
                  src="/images/icon/person-green.png"
                  alt="person"
                  width={40}
                  height={40}
                  className="w-8 h-8"
                />
              </div>
            </div>
            
            <div className="box flex-1 min-w-96">
              <p className="text-justify">
              Clear guidelines and procedures, assigned person to assist mentor in making the meeting happen.
              </p>
              <div className="flex justify-end items-center gap-2 font-bold text-lg mt-2" style={{ color: 'var(--synbio-green)' }}>
                <p>Immaculata Titis Winiati</p>
                <Image 
                  src="/images/icon/person-green.png"
                  alt="person"
                  width={40}
                  height={40}
                  className="w-8 h-8"
                />
              </div>
            </div>

            <div className="box flex-1 min-w-96">
              <p className="text-justify">
              The strongest attribute of Synbio’s mentoring program is its ability to foster innovation and hands-on learning through personalized guidance. Mentors in synthetic biology often come with deep expertise in multidisciplinary fields, enabling mentees to explore complex concepts like gene editing, bioengineering, and systems biology in a more practical and applicable way. This one-on-one mentoring structure helps participants to not only learn cutting-edge techniques but also think critically about how to apply these skills in solving real-world biological challenges, accelerating their growth as researchers and innovators.
              </p>
              <div className="flex justify-end items-center gap-2 font-bold text-lg mt-2" style={{ color: 'var(--synbio-green)' }}>
                <p>Leon Martin</p>
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
