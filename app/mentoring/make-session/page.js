'use client';
import Link from 'next/link';
import React from 'react';
import Image from "next/image";

import { useEffect, useState } from 'react';

export default function Book() {

  const [sheetData, setSheetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSheetData = async () => {
    try {
      const res = await fetch('/api/readMentor', {
        headers: {
          'Cache-Control': 'no-store', // Prevent caching at the request level
          'Surrogate-Control': 'no-store',  // Prevent Vercel's edge cache
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.statusText}`);
      }

      const data = await res.json();
      setSheetData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial data fetch
    fetchSheetData();

    // Poll every 60 seconds to fetch fresh data
    const intervalId = setInterval(() => {
      fetchSheetData();
    }, 60000); // 60 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="overflow-x-hidden">

      <div className="relative h-[30vh]">
        <Image
          src="/images/mentoring/bg.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
    
        <div className="absolute inset-0 px-10 flex justify-between items-end pb-4">
          <div className="flex gap-2 text-white">
            <Link href="/mentoring">
              <p>Mentoring Home</p>
            </Link>
            <p>&gt;</p>
            {/* <Link href="/"> */}
              <p>Make Session</p>
            {/* </Link> */}
          </div>
          <div className="flex justify-end items-center gap-4">
            <Link href="/mentoring/join">
              <p className="font-medium hover:scale-110 text-white">
                Join as Mentor✨
              </p>
            </Link>

            <Link href="/mentoring/login">
              <button className="transparent text-base" type="button">Login</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="page pt-4 flex flex-col gap-8">
        <div className="border border-green-800 rounded-md px-2 py-1 text-gray-300 mx-auto w-full">
          Type mentor name
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center items-stretch">
          
          {sheetData.map((row, index) => (
            // <Link href="\">
              <div key={index} 
                className="card"
              >
                <Image 
                  src={row.Photo}
                  width={400}
                  height={400}
                  alt="mentor photo"
                  className="w-28 h-auto rounded-full my-2 mx-auto"
                />

                <h2 className="text-lg font-semibold">{row.Name}</h2>
                <h3 className="text-sm text-gray-500">{row.Role}</h3>
                <p className="text-xs text-gray-400">{row.Affiliation}</p>

                <div className="inline-block py-1 px-3 my-2 text-sm text-white font-medium rounded-full" style={{ background: 'var(--synbio-green)' }}>
                  {row.Category}
                </div>

                <div className="flex flex-wrap gap-2 text-xs items-center justify-center">
                  <p className="px-2 py-1 rounded-full" style={{ border: '1px solid var(--synbio-green)' }}>{row.SubCat1}</p>
                  {row.SubCat2 && <p className="px-2 py-1 rounded-full" style={{ border: '1px solid var(--synbio-green)' }}>{row.SubCat2}</p>}
                  {row.SubCat3 && <p className="px-2 py-1 rounded-full" style={{ border: '1px solid var(--synbio-green)' }}>{row.SubCat3}</p>}
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
