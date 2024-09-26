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
      router.push("/Generate");
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
    <div className="flex items-center justify-center min-h-screen bg-custom-radial">
      <section className="w-[90%] max-w-[400px] border border-opacity-0 rounded-lg bg-authgray opacity-80 p-6">
        <h1 className="text-lg text-white font-bold text-center">Welcome back to <span className="text-green-500">LinkGenie</span></h1>
        <p className="text-center text-white mt-2">Hello! We are thrilled to have you back</p>

        <form onSubmit={handleSubmit}>
          {/* <div className="flex items-center justify-center">
            <button
              onClick={handleGoogleSignIn}
              className="w-full px-3 py-2 text-sm text-white bg-green-500 border rounded-lg hover:bg-green-400 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? 'Loading...' : (
                <>
                  <Image
                    src="/social/google.png"
                    alt="Google Logo"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Sign up with Google
                </>
              )}
            </button>
          </div> */}
          {/* <div className="flex items-center justify-center mt-3">
            <button
              onClick={handleGoogleSignIn}
              className="w-full px-3 py-2 text-sm text-white border rounded-lg hover:bg-green-400 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? 'Loading...' : (
                <>
                  <Image
                    src="/social/linkedln.png"
                    alt="LinkedIn Logo"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Sign up with LinkedIn
                </>
              )}
            </button>
          </div>

          <div className="text-center my-3">
            <p className="text-white text-sm">or</p>
          </div> */}

          <div className="flex flex-col">
            <label htmlFor="email" className="text-white text-sm">Email address<span className="text-red-500">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-3 py-2 text-sm text-white bg-ingray border border-white rounded-lg focus:outline-none"
            />
          </div>

          <div className="flex flex-col mt-3">
            <label htmlFor="password" className="text-white text-sm">Password<span className="text-red-500">*</span></label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-3 py-2 text-sm text-white bg-ingray border border-white rounded-lg focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className={`w-full px-3 py-2 text-sm text-black bg-white border-green-500 border-2 rounded-lg hover:bg-green-400 hover:text-white ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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

          <p className="mt-4 text-center text-sm text-white">
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
