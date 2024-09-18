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
            <li><Link href="/mentoring">
              <div className="flex gap-2 items-center">
                <Image 
                  src="/images/logo/home-green.png"
                  alt="Home"
                  width={10}
                  height={10}
                  className="h-full w-auto"
                />
                Home
              </div>
            </Link></li>
            <li><Link href="/">
              <div className="flex gap-2 items-center">
                <Image 
                  src="/images/logo/people-green.png"
                  alt="Explore Mentor"
                  width={10}
                  height={10}
                  className="h-full w-auto"
                />
                Explore Mentor
              </div>
            </Link></li>
            <li><Link href="/">
              <div className="flex gap-2 items-center">
                <Image 
                  src="/images/logo/library-green.png"
                  alt="Documentation"
                  width={10}
                  height={10}
                  className="h-full w-auto"
                />
                Documentation
              </div>
            </Link></li>
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
