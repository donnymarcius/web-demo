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

      <ul className="navbar flex h-full">
        <li className="navbar-item"><Link href="/">Competition</Link></li>
        
        <li className="navbar-item dropdown">
          <Link href="/mentoring">Mentoring</Link>
          <ul className="dropdown-menu">
            <li><Link href="/mentoring">Home</Link></li>
            <li><Link href="/">Explore Mentors</Link></li>
            <li><Link href="/">Documentation</Link></li>
          </ul>
        </li>
        
        {/* <li className="navbar-item"><Link href="/">Journal Club</Link></li> */}
        {/* <li className="navbar-item"><Link href="/">Blog</Link></li> */}
        <li className="navbar-item"><Link href="/about">About</Link></li>
        <li className="navbar-item"><Link href="/contact">Contact</Link></li>
      </ul>
    </header>
    
  );
};

export default Header;
