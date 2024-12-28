import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/react';
import Image from "next/image";

const Header = () => {
  const { data: session } = useSession(); // Use useSession to manage session data

  // Check if session exists and get the role
  const isLoggedIn = !!session; // Boolean: true if logged in
  const role = session?.user?.role || ""; // Assumes role is set in session, default to empty string if not available

  // Compute account link based on login status and role
  const accountLink = isLoggedIn
    ? `/mentoring/dashboard/${role}/profile`
    : "/mentoring/login"; // Default to login if not logged in

  return (
    <header className="flex justify-between items-center h-10">
      <div className="flex">
        <Link href="/mentoring">
          <Image 
            src="/images/logo/synbio-white.png"
            alt="Synbio ID logo"
            width={1000}
            height={5910}
            className="h-10 w-auto p-2"
          />
        </Link>
      </div>

      <ul className="navbar flex h-full">
        {/* <li className="navbar-item"><Link href="/">Competition</Link></li> */}
        
        <li className="navbar-item dropdown">
          <Link href="/mentoring">Mentoring</Link>
          <ul className="dropdown-menu">
            <li><Link href="/mentoring/make-session">
              <div className="flex gap-2 items-center">
                <Image 
                  src="/images/icon/people-green.png"
                  alt="Make Session"
                  width={10}
                  height={10}
                  className="h-full w-auto"
                />
                  Make Session
              </div>
            </Link></li>
            <li><Link href="/mentoring/join">
              <div className="flex gap-2 items-center">
                <Image 
                  src="/images/icon/people-green.png"
                  alt="Join as Mentor"
                  width={10}
                  height={10}
                  className="h-full w-auto"
                />
                Join as Mentor
              </div>
            </Link></li>
            {/* <li><Link href="/mentoring/guidebook">
              <div className="flex gap-2 items-center">
                <Image 
                  src="/images/icon/book-green.png"
                  alt="Documentation"
                  width={10}
                  height={10}
                  className="h-full w-auto"
                />
                Guidebook
              </div>
            </Link></li> */}
            <li>
              <Link href={accountLink}>
                <div className="flex gap-2 items-center">
                  <Image 
                    src="/images/icon/library-green.png"
                    alt="Account Icon"
                    width={10}
                    height={10}
                    className="h-full w-auto"
                  />
                  Account
                </div>
              </Link>
            </li>
          </ul>
        </li>
        
        {/* <li className="navbar-item"><Link href="/">Journal Club</Link></li> */}
        {/* <li className="navbar-item"><Link href="/">Blog</Link></li> */}
        <li className="navbar-item"><Link href="/about">About</Link></li>
        {/* <li className="navbar-item"><Link href="/contact">Contact</Link></li> */}
      </ul>
    </header>
    
  );
};

export default Header;
