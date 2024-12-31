'use client';

import Link from 'next/link';
import Image from "next/image";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('mentee'); // Default to 'mentor'
  const [loading] = useState(false);
  const [error, setError] = useState('');
  const [success] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset error state before submitting
    setError(null);

    // Call signIn from next-auth to authenticate user
    const res = await signIn('credentials', {
      email,
      password,
      role,
      redirect: false, // We handle redirect manually
    });
    console.log(email, password);
    console.log(res); // Debug the response to see what's happening

    if (res?.error) {
      setError('Invalid email or password.');
    } else {
       // Redirect user to their role-specific dashboard
      if (role === 'mentor') {
        router.push('/mentoring/dashboard/mentor/profile');
      } else {
        router.push('/mentoring/dashboard/mentee/profile');
      }
    }
  };

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
            <p>Login</p>
          </div>
          <div className="flex justify-end items-center gap-4">
            <Link href="/mentoring/join">
              <p className="font-medium hover:scale-110 text-white">
                Join as Mentor✨
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className="page flex flex-col gap-2 mt-8">
        <form className="flex flex-col gap-1 mx-auto w-full max-w-sm" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border border-green-800 rounded-md"
              required
            />
          </div>

          <div className="mt-2">
            <div className="flex justify-center gap-4 mt-2">
              <label className="flex items-center">Login as: </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="mentee"
                  checked={role === 'mentee'}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2"
                />
                Mentee
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="mentor"
                  checked={role === 'mentor'}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2"
                />
                Mentor
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="text-white px-4 py-2 mt-4 rounded-md"
            style={{ backgroundColor: 'var(--synbio-green)' }}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
        </form>

        <div className="flex justify-center mt-4">
          <p>
            Don’t have an account?{' '}
            <Link href="/mentoring/register" className="underline">
              Register here
            </Link>
          </p>
        </div>
      </div>

      <div className="p-20"></div>
    </div>
  );
}