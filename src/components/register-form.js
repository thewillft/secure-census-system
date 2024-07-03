'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
 
export default function RegisterForm() {
  const router = useRouter()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const handleSubmit = () => fetch(
    '/api/auth/register', 
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
    }).then(resp => { if (resp.ok) router.push('/login') }).catch(e => console.log(e));

  const passwordsMatch = password === confirmPassword;
 
  return (
    <form action={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-2xl text-black`}>
          Please create an account.
        </h1>
        <div className="w-full">
        <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Full Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-gray-900"
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                required
                value={name}
                onChange={handleNameChange}
              />
            </div>
          </div>
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
                placeholder="Enter your password"
                required
                minLength={6}
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <div className="mt-4">
            <label
               className="mb-3 mt-5 block text-xs font-medium text-gray-900"
               htmlFor="confirm-password"
             >
               Confirm Password
             </label>
             <div className="relative">
               <input
                 className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-gray-900"
                 id="confirm-password"
                 type="password"
                 name="confirm-password"
                 placeholder="Confirm your password"
                 required
                 minLength={6}
                 value={confirmPassword}
                 onChange={handleConfirmPasswordChange}
               />
             </div>
           </div>
        </div>
        <button
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 disabled:bg-gray-400"
          disabled={!name || !email || !password || !confirmPassword || !passwordsMatch}
        >
          Register
        </button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {!passwordsMatch && confirmPassword && (
            <p className="text-sm text-red-500">Passwords do not match</p>
          )}
          {/* {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )} */}
        </div>
      </div>
    </form>
  );
}