'use client';

import Link from 'next/link';
import React from 'react';
import Image from "next/image";

export default function Home() {
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
              <p>Join as Mentor</p>
            {/* </Link> */}
          </div>
          <div className="flex justify-end items-center gap-4">
            {/* <Link href="/mentoring/join">
              <p className="font-medium hover:scale-110 text-white">
                Join as Mentor✨
              </p>
            </Link> */}

            <Link href="/mentoring/login">
              <button className="transparent text-base" type="button">Login</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="page flex flex-col gap-8">
        <div>
          <div className="flex flex-col gap-2 mb-4">
            <h2>Join Us as a Mentor for the Synbio Indonesia Mentoring Program!</h2>
            <p>We are excited to announce that Synbio Indonesia is launching its <b>Mentoring Program</b> once again! This time, mentees can schedule mentoring sessions with their mentors anytime through the website that will be launched soon!</p>
            <p>As of now, we are looking for inspiring mentors in the field of life sciences! If you&apos;re an expert in <b>biotechnology, synthetic biology, or related disciplines</b>, this is your chance to share your knowledge and guide the next generation of scientists. 🌱🔬</p>
          </div>
          
          <div className="flex flex-col gap-2">
            <h2>Why is this program being held?</h2>
            <p>We believe everyone should have access to mentorship—whether they aim to pursue studies abroad, explore careers in the life sciences industry, or are currently pursuing their <b>undergraduate, master&apos;s, or PhD</b> studies.</p>
          </div>
          
          <div className="flex justify-center mb-4">
            <a href="https://www.bit.ly/MentorSTFRecruitment" target="_blank" rel="noopener noreferrer">
              <button className="button-white font-medium text-xl mt-6" type="button">Click Here to Register as Mentor</button>
            </a>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <p><b>Program period</b> 📅: 29 November 2024 - 28 February 2025</p>
            <p>Mentoring sessions will be scheduled flexibly based on the mentor and mentee's availability, making it easy to fit into your schedule.</p>
            <p>Let&apos;s work together to shape the future of life sciences by mentoring the talented young individuals of tomorrow. 💡🌍</p>
          </div>
          
        </div>

        <div>
          <h2 className="text-center">Testimony from Other Mentors</h2>
          <div className="flex flex-col gap-4">
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
