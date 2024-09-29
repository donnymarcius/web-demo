'use client'
import Link from 'next/link';
import React from 'react';
import Image from "next/image";

import { useEffect, useState } from 'react';

export default function Book() {
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
            <p>Book</p>
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
        
        <div className="flex flex-wrap gap-4 justify-center items-stretch">
          {people.map((person, index) => (
            // <Link href="\">
              <div key={index} 
                className="card"
              >
                <Image 
                  src={person.photo}
                  width={400}
                  height={400}
                  alt="mentor photo"
                  className="w-28 h-auto rounded-full my-2 mx-auto"
                />

                <h2 className="text-lg font-semibold">{person.name}</h2>
                <h3 className="text-sm text-gray-500">{person.role}</h3>
                <p className="text-xs text-gray-400">{person.affiliation}</p>

                <div className="inline-block py-1 px-3 my-2 text-sm text-white font-medium rounded-full" style={{ background: 'var(--synbio-green)' }}>
                  {person.category}
                </div>

                <div className="flex flex-wrap gap-2 text-xs items-center justify-center">
                  <p className="px-2 py-1 rounded-full" style={{ border: '1px solid var(--synbio-green)' }}>{person.subcat1}</p>
                  {person.subcat2 && <p className="px-2 py-1 rounded-full" style={{ border: '1px solid var(--synbio-green)' }}>{person.subcat2}</p>}
                  {person.subcat3 && <p className="px-2 py-1 rounded-full" style={{ border: '1px solid var(--synbio-green)' }}>{person.subcat3}</p>}
                </div>
              </div>
            // </Link>
          ))}
        </div>
      </div>

      <div className="p-20"></div>
    </div>
  );
}
