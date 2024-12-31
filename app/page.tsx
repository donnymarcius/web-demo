import Link from 'next/link';
import React from 'react';
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <section className="home h-[calc(95dvh)] px-6 flex flex-col justify-center items-center text-center">
        <h1
          className="text-9xl font-bold my-6"
          style={{ 
            backgroundImage: 'linear-gradient(to right, var(--synbio-green), var(--natural-green))',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Synbio ID
        </h1>
        <p className="text-lg">
          A Non-profit Organization that Focus on Enhancing Synthetic Biology adipiscing
          Bioinformatics Enthusiasts in Indonesia. We are Ready to Make Any
          Collaborations with Your Institution.
        </p>
      </section>

      {/* <div
        className="relative min-h-[200px] flex flex-col justify-center text-white px-10"
        style={{
          backgroundImage: "linear-gradient(to right, var(--synbio-green), var(--natural-green), transparent), url('/images/images.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="w-[60vw] py-6">
          <h2 style={{ color: 'var(--light-green)' }}>Synbio ID Community</h2>
          <p className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          <button className="white" type="button">Learn More</button>
        </div>
      </div>

      <div className="page flex my-8 gap-10 items-center justify-end">
        <div className="w-[calc(60dvw)] text-right">
          <h2>Competition</h2>
          <p className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          <Link href="/mentoring">
            <button type="button">Learn More</button>
          </Link>
        </div>

        <Image 
          src="/images/placeholder-16x9.jpg"
          alt="Photo"
          width={800}
          height={591}
          className="w-[calc(25dvw)] h-full"
        />
      </div>

      <div className="page flex my-8 flex gap-10 items-center justify-start">
        <Image 
          src="/images/placeholder-16x9.jpg"
          alt="Photo"
          width={800}
          height={591}
          className="w-[calc(25dvw)] h-full"
        />
        
        <div className="w-[calc(60dvw)] text-left">
          <h2>Mentoring</h2>
          <p className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          
          <div className="flex gap-2">
            <Link href="/mentoring">
              <button type="button">Learn More</button>
            </Link>
            <Link href="/mentoring/documentation">
              <button type="button">Documentation</button>
            </Link>
          </div>
          
        </div>
      </div>

      <div className="page flex my-8 flex gap-10 items-center justify-end">
        <div className="w-[calc(60dvw)] text-right">
          <h2>Journal Club</h2>
          <p className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          <Link href="/mentoring">
            <button type="button">Learn More</button>
          </Link>
        </div>

        <Image 
          src="/images/placeholder-16x9.jpg"
          alt="Photo"
          width={800}
          height={591}
          className="w-[calc(25dvw)] h-full"
        />
      </div>

      <div className="page flex my-8 flex gap-10 items-center justify-start">
        <Image 
          src="/images/placeholder-16x9.jpg"
          alt="Photo"
          width={800}
          height={591}
          className="w-[calc(25dvw)] h-full"
        />
        
        <div className="w-[calc(60dvw)] text-left">
          <h2>Synbio Blog</h2>
          <p className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          
          <div className="flex gap-2">
            <Link href="/mentoring">
              <button type="button">Learn More</button>
            </Link>
          </div>
          
        </div>
      </div> */}

      <div className="p-20"></div>
    </div>
  );
}
