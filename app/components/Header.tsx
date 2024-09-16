import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white font-gordita p-4">
      <nav className="container flex justify-between">
        <ul className="flex space-x-4">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>

        <div className="flex flex-end space-x-4">
            <div className="bg-black rounded-full">
                Login as Mentee
            </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
