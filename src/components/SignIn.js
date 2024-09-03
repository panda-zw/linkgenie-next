"use client"; // This line makes this file a client component

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("userData"));

    // Check if the stored user exists and if the credentials match
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      console.log("Successfully signed in");
      router.push("/"); // Redirect to home page
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <section className="w-full max-w-md p-8 bg-gray-800 rounded shadow-md">
        <h1 className="py-3 text-center text-2xl font-black text-white">
          <span className="text-green-400">Genie</span> - Sign In
        </h1>
        <button className="mb-4 w-full flex items-center justify-center rounded bg-gray-700 px-4 py-2 text-sm text-white transition hover:bg-gray-600">
          <FontAwesomeIcon icon={faGoogle} className="mr-2" />
          Sign in with Google
        </button>
        <button className="mb-4 w-full flex items-center justify-center rounded bg-gray-700 px-4 py-2 text-sm text-white transition hover:bg-gray-600">
          <FontAwesomeIcon icon={faGithub} className="mr-2" />
          Sign in with GitHub
        </button>
        <div className="mb-6 text-center">
          <p className="text-gray-400 text-sm">Or, sign in with your email</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 text-sm text-white bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 text-sm text-white bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && (
            <div className="mb-4 text-red-500 text-sm">
              {error}
            </div>
          )}
          <div className="mb-4 text-right">
            <a href="#0" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-400"
            >
              Log In
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </section>
    </div>
  );
}
