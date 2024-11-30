'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from "next/image";

export default function Book() {
  const [sheetData, setSheetData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['Academia', 'Company', 'Start-Up', 'Scholarship Awardee', 'Government']; // Predefined categories

  const fetchSheetData = async () => {
    try {
      const res = await fetch('/api/readMentor', {
        headers: {
          'Cache-Control': 'no-store',
          'Surrogate-Control': 'no-store',
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.statusText}`);
      }

      const data = await res.json();
      setSheetData(data);
      setFilteredData(data); // Initialize filtered data
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSheetData();

    const intervalId = setInterval(() => {
      fetchSheetData();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = sheetData.filter((mentor) =>
      mentor.full_name.toLowerCase().includes(query) ||
      mentor.role.toLowerCase().includes(query) ||
      mentor.affiliation.toLowerCase().includes(query)
    );

    setFilteredData(filtered);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    const filtered = sheetData.filter((mentor) =>
      category === '' || mentor.category.toLowerCase() === category.toLowerCase()
    );

    setFilteredData(filtered);
  };

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
            <p>Make Session</p>
          </div>
          <div className="flex justify-end items-center gap-4">
            <Link href="/mentoring/join">
              <p className="font-medium hover:scale-110 text-white">Join as Mentor✨</p>
            </Link>
            <Link href="/mentoring/login">
              <button className="transparent text-base" type="button">Login</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="page pt-4 flex flex-col gap-8">
        {/* Search Bar */}
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by name, role, or affiliation..."
            className="border border-green-800 rounded-md px-2 py-1 mx-auto w-full"
          />

          {/* Category Filters */}
          <div className="flex gap-2 justify-left">
            <h3 className="pr-1">Mentor Category:</h3>
            <button
              onClick={() => handleCategoryFilter('')}
              className={`filter ${selectedCategory === '' ? 'bg-green-800 text-white' : 'bg-gray-200 text-gray-400'}`}
            >
              All
            </button>
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryFilter(category)}
                className={`filter ${selectedCategory === category ? 'bg-green-800 text-white' : 'bg-gray-200 text-gray-400'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Mentor Cards */}
        <div className="flex flex-wrap gap-4 justify-center items-stretch">
          {filteredData.map((row, index) => (
            <Link key={index} href={`/mentoring/mentor/${row.username}`} className="card">
              <div className="text-center">
                <Image
                  src={row.profile_picture}
                  width={400}
                  height={400}
                  alt={row.username}
                  className="w-28 h-28 object-cover rounded-full my-2 mx-auto"
                />
                <h2
                  className="text-lg font-semibold truncate"
                  title={row.full_name}
                >
                  {row.full_name}
                </h2>
                <h3
                  className="text-sm text-gray-500 truncate"
                  title={row.role}
                >
                  {row.role}
                </h3>
                <p
                  className="text-xs text-gray-400 truncate"
                  title={row.affiliation}
                >
                  {row.affiliation}
                </p>
                <div
                  className="inline-block py-1 px-3 my-2 text-sm text-white font-medium rounded-full"
                  style={{ background: 'var(--synbio-green)' }}
                >
                  {row.category}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="p-20"></div>
    </div>
  );
}
