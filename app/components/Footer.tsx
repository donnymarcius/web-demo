import Link from 'next/link';
import React from 'react';
import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <div className="px-10 py-8" style={{ background: "linear-gradient(to right, var(--synbio-green), var(--natural-green), transparent), url('/images/images.jpg')" }}>
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

        <div className="text-white flex gap-16">
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
                  src="/images/icon/ig-white.png"
                  alt="Instagram Icon"
                  width={20}
                  height={20} 
                  className="object-cover"
                />
              </div>
              <a href="https://www.instagram.com/synbio.id/" target="_blank" rel="noopener noreferrer">
                <p className="font-light">Instagram</p>
              </a>
            </div>
            
            <div className="flex gap-2 items-center ml-2">
              <div className="w-6 h-6 flex items-center justify-center">
                <Image
                  src="/images/icon/linkedin-white.png"
                  alt="LinkedIn Icon"
                  width={20}
                  height={20} 
                  className="object-cover"
                />
              </div>
              <a href="https://www.linkedin.com/company/synbio-indonesia/" target="_blank" rel="noopener noreferrer">
                <p className="font-light">LinkedIn</p>
              </a>
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