"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, getProviders } from "next-auth/react";
import Swal from 'sweetalert2';
import Image from 'next/image';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Incorrect email or password',
        toast: true,
        position: 'top-end',
        timer: 3000,
        timerProgressBar: true,
      });
      console.error("Error signing in:", result.error);
    } else {
      router.push("/Generate");
      Swal.fire({
        icon: 'success',
        title: 'Welcome back!',
        text: 'You have successfully logged in.',
        toast: true,
        position: 'top-end',
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-radial">
      <section className="w-[90%] max-w-[400px] border border-opacity-0 rounded-lg bg-authgray opacity-80 p-8">
        <h1 className="text-2xl font-bold text-center mb-2 text-white">Welcome back to <span className="text-green-500">LinkGenie</span></h1>
        <p className="text-center text-white mb-6">We&apos;re thrilled to have you back!</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Email address<span className="text-red-500">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="mt-1 block w-full px-3 py-2 text-sm text-white bg-ingray border border-white rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">Password<span className="text-red-500">*</span></label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mt-1 block w-full px-3 py-2 text-sm text-white bg-ingray border border-white rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2 text-sm font-medium text-black bg-white border-green-500 border-2 rounded-lg hover:bg-green-400 hover:text-white ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Signing In...
              </span>
            ) : (
              'Log In'
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-white">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="underline hover:underline font-semibold">
            Create account
          </Link>
        </p>
      </section>
    </div>
  );
}
