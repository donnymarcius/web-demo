import Link from 'next/link';
import React from 'react';
import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <div className="px-20 py-8" style={{ backgroundColor: 'var(--synbio-green)' }}>
        <div className="w-32 pb-4">
          <Link href="/">
            <Image 
              src="/images/logo/synbio.png"
              alt="Synbio ID Logo"
              width={800}
              height={591}
              className="h-full w-full"
            />
          </Link>
        </div>

        <div className="text-white flex gap-24">
          <div className="flex flex-col gap-1">
            <h6>Synbio ID Program</h6>
            <p className="flex flex-col gap-1 ml-2 font-light">
              <Link href="/competition">Competition</Link>
              <Link href="/mentoring">Mentoring</Link>
              <Link href="/journalclub">Journal Club</Link>
              <Link href="/blog">Blog</Link>
            </p>
          </div>
          
          <div className="flex flex-col gap-2">
            <h6>Social Media</h6>
            <div className="flex gap-2 items-center ml-2">
              <div className="w-6 h-6 flex items-center justify-center">
                <Image
                  src="/images/logo/ig-white.png"
                  alt="Instagram Logo"
                  width={20}
                  height={20} 
                  className="object-cover"
                />
              </div>
              <p className="font-light">Instagram</p>
            </div>
            
            <div className="flex gap-2 items-center ml-2">
              <div className="w-6 h-6 flex items-center justify-center">
                <Image
                  src="/images/logo/linkedin-white.png"
                  alt="LinkedIn Logo"
                  width={20}
                  height={20} 
                  className="object-cover"
                />
              </div>
              <p className="font-light">LinkedIn</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-2 text-white text-center font-light" style={{ backgroundColor: 'var(--black)' }}>
        <p>&copy; {new Date().getFullYear()} Synbio ID.&nbsp; All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;