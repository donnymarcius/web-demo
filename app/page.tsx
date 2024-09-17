// import Link from 'next/link';
import React from 'react';
// import Image from "next/image";

export default function Home() {
  return (
    <div>
      <section className="px-6 h-[calc(95dvh)] flex flex-col text-center justify-center items-center">
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
          A Non-profit Organization that Focus on Enhancing Synthetic Biology and <br />
          Bioinformatics Enthusiasts in Indonesia. We are Ready to Make Any <br />
          Collaborations with Your Institution.
        </p>
      </section>

      <div
        className="relative min-h-[200px] flex flex-col justify-center text-white px-6"
        style={{
          backgroundImage: "linear-gradient(to right, var(--synbio-green), var(--natural-green), transparent), url('/images/images.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="w-[60vw] py-6">
          <h2>Synbio ID Community</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          <button className="white">Learn More</button>
        </div>
      </div>

      <div className="flex px-6 p-8">
        <div>
          <h2>Competition</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          <button>Learn More</button>
        </div>


      </div>
    </div>
  );
}
