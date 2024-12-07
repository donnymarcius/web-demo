'use client'; // This marks the file as a Client Component

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { CategoryData, CategoryProps } from '../data/cardCategory';
import { TestimonialData } from '../data/cardTestimony';
import TestimonialCarousel from '../components/TestimonialCarousel';

const Category = ({ src, alt, title, description }: CategoryProps) => (
  <div className="flex flex-1 flex-col items-center text-center max-w-[220px]">
    <Image
      src={src}
      alt={alt}
      width={180} // Tailored for layout; adjust if needed
      height={180}
      className="w-12 h-12 mb-2"
    />
    <div>
      <p className="text-xl font-bold pb-2" style={{ color: 'var(--synbio-green)' }}>{title}</p>
      <p className="text-sm whitespace-normal">{description}</p>
    </div>
  </div>
);

export default function Home() {
  return (
    <div>
      <div className="relative h-screen">
        <Image
          src="/images/mentoring/bg.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        <div className="absolute inset-0 flex flex-col justify-start text-white mx-20 mt-16">
          <div className="flex justify-end items-center gap-4 pb-10">
            <Link href="/mentoring/join">
              <p className="font-medium hover:scale-110 text-white">
                Join as Mentor✨
              </p>
            </Link>

            <Link href="/mentoring/login">
              <button className="transparent text-base" type="button">Login</button>
            </Link>
          </div>

          <h1 className="text-7xl font-bold my-6 text-white">
            Welcome to SynBio ID&apos;s Mentoring Program!
          </h1>
          <p className='text-xl pr-40'>
            Meet our most anticipated program: Synbio ID&apos;s Mentoring—where <b className="text-white">life science enthusiasts 
            and professionals can connect with experts</b> from around the world. Whether you&apos;re navigating your 
            academic journey, exploring synthetic biology, or looking to advance your career, our platform 
            makes it easy to book <b className="text-white">one-on-one mentoring sessions</b> with leading experts in the field.
          </p>

          <div className="flex gap-4 mt-6">
            <Link href="/mentoring/make-session">
              <button type="button" className="transparent text-lg">Make Session</button>
            </Link>
            <Link href="/mentoring/guidebook">
              <button type="button" className="transparent text-lg">Guidebook</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="px-20 py-5 flex gap-2 mt-4 flex-wrap justify-start">
        {CategoryData.map((item, index) => (
          <Category
            key={index}
            src={item.src}
            alt={item.alt}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>

      <div className="px-20 py-5 flex flex-col gap-4 items-center text-center" style={{ background: 'linear-gradient(to right, var(--synbio-green), var(--natural-green))' }}>
        <h2 className="text-white">Interest Joining Us as a Mentee?</h2>

        <div className="flex text-lg gap-10 px-6 py-2 text-white">
          <p>
            Explore <b>diverse perspectives,</b> gain <b>valuable insights</b>, and accelerate your growth with <b>tailored guidance</b>.
          </p>

          <p>
            Start your journey by booking a session today, and <b>take your next step</b> towards <b>innovation and discovery</b> in life sciences.
          </p>
        </div>

        <div className="flex gap-4">
          <Link href="/mentoring/login">
            <button className="transparent" type="button">Click Here to Start Your Journey</button>
          </Link>
        </div>
      </div>
      
      <div className="px-20 pt-5 pb-10">
        <h2 className="pb-4">Testimony from Previous Batch</h2>
        <TestimonialCarousel testimonials={TestimonialData} />
      </div>
        
      
      <div className="px-20 py-5" style={{ backgroundColor: 'var(--light-green)' }}>
        <div className="flex gap-10 items-center">
          <Image 
            src="/images/mentoring/call-mentor.png"
            alt="calling-for-mentors"
            width={400}
            height={400}
            className="h-22 w-full"
          />

          <div className="flex flex-col gap-2">
            <h2>Calling for Mentors!</h2>
            <p>If you&apos;re an expert in biotechnology, synthetic biology, or other life science fields, this is your chance to share your knowledge and guide the next generation of scientists.</p>
            
            <Link href="/mentoring/join">
              <button className="button-lgreen" type="button">Join as Mentor Now✨</button>
            </Link>

            <p style={{ color: 'var(--synbio-green)' }}>
              <b>Mentoring Period</b>: Jan 1st, 2025 - Mar 31st, 2025
            </p>
          </div>
        </div>
      </div>

      <div className="px-20">
        {/* <h2>Our Partners</h2> */}
      </div>

      <div className="p-20"></div>
    </div>
  );
}
