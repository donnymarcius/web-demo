'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from "next/image";
// import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router

export default function Registration() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmpassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // const router = useRouter(); // Use next/navigation's useRouter

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate required fields
    if (!formData.email || !formData.password) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmpassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      // Step 1: Check if the email already exists
      const emailCheckResponse = await fetch('/api/checkEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });

      const emailCheckResult = await emailCheckResponse.json();

      if (emailCheckResponse.ok && emailCheckResult.exists) {
        // Redirect to login if email exists
        setError(
          <span>
            This email is already registered. Please{' '}
            <a href="/login" className="underline">
              log in
            </a>.
          </span>
        );
      } else {
        // Step 2: Proceed with registration
        if (formData.password !== formData.confirmpassword) {
          setError('Passwords do not match.');
          return;
        }

        const response = await fetch('/api/addAccount', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          setSuccess(result.message);
        } else {
          setError(result.message);
        }
      }
    } catch (err) {
      setError('An error occurred while registering: ${err.message}');
    } finally {
      setLoading(false);
    }
  };

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
              <p>Register as Mentee</p>
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

      <div className="page flex flex-col gap-2 mt-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-1 mx-auto w-full max-w-sm">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-green-800 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-green-800 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-green-800 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white px-4 py-2 mt-4 rounded-md"
            style={{ backgroundColor: 'var(--synbio-green)' }}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </form>
      </div>

      <div className="p-20"></div>
    </div>
  );
}
