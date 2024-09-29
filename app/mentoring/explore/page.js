'use client'
import Link from 'next/link';
import React from 'react';
// import Image from "next/image";

import { useEffect, useState } from 'react';

export default function Explore() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/sheet');
        const data = await response.json();
        setPeople(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="overflow-x-hidden">
      <section className="banner">
        <h1 className="font-bold">Join as Mentor</h1>
        <p className="text-lg italic text-center">Gathering mentors and mentees across Indonesia to explore life science</p>
      </section>

      <div className="px-10 py-4 flex justify-between items-center">
        <div className="flex gap-2">
          <Link href="/mentoring">
            <p>Mentoring Home</p>
          </Link>
          <p>&gt;</p>
          {/* <Link href="/"> */}
            <p>Explore</p>
          {/* </Link> */}
        </div>
        <div className="flex justify-end items-center gap-4">
          <Link href="/mentoring/join">
            <p className="font-medium hover:scale-110" style={{ color: 'var(--synbio-green)' }}>
              Join as Mentor✨
            </p>
          </Link>

          <Link href="/mentoring/login">
            <button className="login" type="button">Login</button>
          </Link>
        </div>
      </div>

      <div className="px-10 pt-4 flex flex-col gap-8">
        <div className="border border-green-800 rounded-md px-2 py-1 text-gray-300 mx-auto w-full">
          Type mentor name
        </div>
        
        <div className="flex flex-wrap gap-6 justify-center items-stretch">
          {people.map((person, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold">{person.name}</h2>
              <h3 className="text-sm text-gray-500">{person.role}</h3>
              <p className="text-xs text-gray-400">{person.affiliation}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-20"></div>
    </div>
  );
}
