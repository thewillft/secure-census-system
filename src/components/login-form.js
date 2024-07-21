'use client';

import { useState } from 'react';
import { signIn } from "next-auth/react"
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
 
export default function LoginForm() {
  const searchParams = useSearchParams()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleSubmit = async () => await signIn('credentials', { email, password, callbackUrl: '/dashboard' })
 
  return (
    <form action={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-2xl text-black`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-gray-900"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={handleEmailChange}
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-gray-900"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
        </div>
        <button
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 disabled:bg-gray-400"
          disabled={!email || !password}
        >
          Log in
        </button>
        <div
          className="flex flex-col items-center h-8 mt-3"
          aria-live="polite"
          aria-atomic="true"
        >
          <p>Need an account? Register <Link className="text-blue-500" href={'/register'}>here</Link>.</p>
          {searchParams.has('error') &&  <p className="text-sm text-red-500">{searchParams.get('error')}</p>}
        </div>
      </div>
    </form>
  );
}