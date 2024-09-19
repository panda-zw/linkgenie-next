"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from 'react-toastify';
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
      toast.error("Failed to login: Incorrect email or password");
      console.error("Error signing in:", result.error);
    } else {
      router.push("/");
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const result = await signIn("google", { redirect: true });
    if (result?.error) {
      alert("Google sign-in failed");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-oval-gradient from-[#324d7e] to-[#0e1726]">
      <section className="w-[692px] absolute top-[60px] border border-opacity-0 rounded-lg bg-authgray opacity-70">
        <h1 className="text-2xl text-white font-bold font-mulish text-center mt-7">Welcome to <span className="text-green-500">LinkGenie</span></h1>
        <p className="text-center text text-white mt-3 font-mulish">Hello! We are thrilled to have you onboard</p>
        <form onSubmit={handleSubmit} className="font-mulish">
          <div className="mb-3 items-center justify-center flex">
            <button
              onClick={handleGoogleSignIn}
              className="w-10/12 px-4 py-2.5 mt-5 text-base sm:text-lg text-white bg-green-500 border rounded-lg hover:bg-green-400 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                'Loading...'
              ) : (
                <>
                  <Image
                    src="/social/google.png"
                    alt="Google Logo"
                    width={25}
                    height={25}
                    className="mr-2"
                  />
                  Continue with Google
                </>
              )}
            </button>
          </div>
          <div className="mb-4 items-center justify-center flex">
            <button
              onClick={handleGoogleSignIn}
              className="w-10/12 px-4 py-2.5 text-base sm:text-lg text-white border rounded-lg hover:bg-green-400 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                'Loading...'
              ) : (
                <>
                  <Image
                    src="/social/linkedln.png"
                    alt="LinkedIn Logo"
                    width={25}
                    height={25}
                    className="mr-2"
                  />
                  Continue with LinkedIn
                </>
              )}
            </button>
          </div>
          <div className="mb-6 text-center">
            <p className="text-white text-sm sm:text-base">or</p>
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="email" className="px-14 mb-3 text-white">Email address<span className="text-red-500">*</span></label>
            <div className="flex justify-center">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-10/12 px-4 py-2.5 sm:py-4 text-lg sm:text-base text-white bg-authgray border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="password" className="px-14 text-white mb-3">Password<span className="text-red-500">*</span></label>
            <div className="flex justify-center">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-10/12 px-4 py-2.5 sm:py-4 text-lg sm:text-base text-white bg-authgray border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mb-4 items-center justify-center flex">
            <button
              type="submit"
              className={`w-10/12 px-4 py-2.5 sm:py-4 text-base sm:text-lg border-green-500 border text-black bg-white rounded-lg hover:bg-green-400 hover:text-white ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                'Log In'
              )}
            </button>

          </div>
          <p className="mt-6 text-center text-sm sm:text-base mb-6 text-white">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="underline hover:underline font-semibold">
              Create account
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}
