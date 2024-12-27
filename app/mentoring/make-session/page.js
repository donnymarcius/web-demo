'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from "next/image";

export default function Book() {
  const [sheetData, setSheetData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('default'); // Sorting state

  const { data: session } = useSession(); // Use useSession to manage session data
  const role = session?.user?.role || ""; // Assumes role is set in session, default to empty string if not available
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    signOut(); // Triggers NextAuth logout functionality
  };

  const categories = ['Academia', 'Company', 'Start-Up', 'Scholarship Awardee', 'Government'];

  const fetchSheetData = async () => {
    try {
      console.log('This is executed');
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
      mentor.position.toLowerCase().includes(query) ||
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

  const handleSort = (order) => {
    setSortOrder(order);
    if (order === 'default') {
      setFilteredData([...sheetData]);
    } else {
      const sorted = [...filteredData].sort((a, b) => {
        const nameA = a.full_name.toLowerCase();
        const nameB = b.full_name.toLowerCase();

        if (order === 'asc') return nameA.localeCompare(nameB);
        if (order === 'desc') return nameB.localeCompare(nameA);
        return 0;
      });

      setFilteredData(sorted);
    }
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
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
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
            
            {/* Check if the user is logged in, and display email or "Login" */}
            {session ? (
              // Dropdown Button for Logged-In User
              <div className="relative">
                <button
                  className="transparent text-base"
                  type="button"
                  onClick={toggleDropdown}
                >
                  {session.user.email}
                </button>
                {isDropdownOpen && (
                  <ul className="absolute right-0 text-black pr-2 rounded shadow-md">
                    <li>
                      <Link href={`/mentoring/dashboard/${role}/profile`}>
                        <button className="transparent block text-sm w-full text-center rounded-none" style={{ background: 'var(--synbio-green)' }}>
                          Profile
                        </button>
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="transparent block text-sm w-full text-center rounded-none" style={{ background: 'var(--synbio-green)' }}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Link href="/mentoring/login">
                <button className="transparent text-base" type="button">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="page pt-4 flex flex-col gap-8">
        {/* Search and Filter Section */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by name, position, or affiliation..."
              className="border border-green-800 rounded-md px-2 py-1 mx-auto w-full"
            />

            <div className="flex items-center gap-2">
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={(e) => handleSort(e.target.value)}
                className="border border-green-800 rounded-md px-2 py-1"
              >
                <option value="default">No Sort</option>
                <option value="asc">Name A-Z</option>
                <option value="desc">Name Z-A</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center">
            {/* Category Filters */}
            <div className="flex gap-2">
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
                  title={row.position}
                >
                  {row.position}
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
