import Link from 'next/link';
import React from 'react';
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex justify-between items-center h-12">
      <div className="flex">
        <Link href="/">
          <Image 
            src="/images/logo/synbio.png"
            alt="Synbio ID Logo"
            width={100}
            height={591}
            className="h-full w-auto p-2"
          />
        </Link>
      </div>

      <nav className="flex h-full">
        <div className="dropdown"><Link href="/">Competition</Link></div>
        <div className="dropdown"><Link href="/mentoring">Mentoring</Link></div>
        {/* <div className="dropdown"><Link href="/">Journal Club</Link></div> */}
        {/* <div className="dropdown"><Link href="/">Blog</Link></div> */}
        <div className="dropdown"><Link href="/about">About</Link></div>
        <div className="dropdown"><Link href="/contact">Contact</Link></div>
      </nav>
    </header>
    
  );
};

export default Header;
