'use client'
import Link from 'next/link';
import React from 'react';
import Image from "next/image";

import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
interface RowData  {
  category: string;
  name: string;
  role: string;
  affiliation: string;
  linkedin: string;
  field1: string;
  field2: string
}

export default function Home() {
  
  const [rows, setRows] = useState<RowData[]>([]);

  useEffect(() => {
    const fetchExcelFile = async () => {
      try {
        // Fetch the file from the public folder
        const response = await fetch('/data/past-mentors.xlsx');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const arrayBuffer = await response.arrayBuffer();
        
        // Parse the Excel file
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert the sheet data to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        console.log('Parsed Data:', jsonData);

        // Loop through the rows and extract the data
        const rowsData = jsonData.map((row: any) => ({
          category: row[0] as string,
          name: row[1] as string,
          role: row[2] as string,
          affiliation: row[3] as string,
          linkedin: row[4] as string,
          field1: row[5] as string,
          field2: row[6] as string
        }));

        setRows(rowsData);
      } catch (error) {
        console.error('Error fetching or reading the Excel file:', error);
      }
    };

    fetchExcelFile();
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
          {rows.map((row, index) => (
            <div 
              key={index}
              className="border border-green-800 rounded-lg rounded-lg p-4 text-center w-56"
            >
              <Image
                src="/images/placeholder_person.png"
                alt="person"
                width={400}
                height={400}
                className="w-24 h-auto mx-auto"
              />

              <div>
                <h4>{row.name}</h4>
                <p className="font-bold">{row.role}</p>
                <p className="italic text-sm">{row.affiliation}</p>
              </div>
              
              <div className="inline-block my-2 px-2 py-1 text-white rounded-full text-sm font-medium" style={{ background: 'var(--synbio-green)' }}>
                {row.category}
              </div>
              
              <div className="flex gap-2 justify-center">
                <div className="block px-2 py-1 rounded-full text-xs font-medium" style={{ border: '1px solid var(--synbio-green)' }}>
                  {row.field1}
                </div>
                <div className="block px-2 py-1 rounded-full text-xs font-medium" style={{ border: '1px solid var(--synbio-green)' }}>
                  {row.field2}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-20"></div>
    </div>
  );
}
