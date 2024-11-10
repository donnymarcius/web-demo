'use client';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Registration() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

    try {
      const response = await fetch('/api/addAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An error occurred while registering.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-hidden">
      <section className="banner">
        <h1 className="font-bold">Register</h1>
        <p className="text-lg italic text-center">Join us as a mentor or mentee to explore life sciences!</p>
      </section>

      <div className="px-10 py-4 flex justify-between items-center">
        <div className="flex gap-2">
          <Link href="/mentoring">
            <p>Mentoring Home</p>
          </Link>
          <p>&gt;</p>
          <p>Register</p>
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

      <div className="page flex flex-col gap-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto w-full max-w-sm">
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-green-800 rounded-md"
              required
            />
          </div>

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
            style={{ backgroundcolor: 'var(--synbio-green)' }}
          >
            Register
          </button>
        </form>

        <p className="text-center">
          Already have an account? <Link href="/mentoring/login"><u>Login here</u></Link>
        </p>
      </div>

      <div className="p-20"></div>
    </div>
  );
}
