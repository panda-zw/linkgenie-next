"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from 'next/image';

export default function SignUp() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            setLoading(false);
            return;
        }

        const userData = {
            username,
            email,
            password,
        };

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                router.push("/auth/signin");
            } else {
                console.error("Error signing up:", await response.json());
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        await signIn("google", { redirect: true });
        setLoading(false);
    };

    const handleLinkedInSignIn = async () => {
        setLoading(true);
        await signIn("linkedin", { redirect: true });
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-oval-gradient from-[#324d7e] to-[#0e1726]">
            <section className="w-full sm:w-[600px] md:w-[692px] absolute top-16 p-4 sm:p-8 border border-opacity-0 rounded-lg bg-authgray opacity-70">
                <h1 className="text-xl sm:text-2xl text-white font-bold font-mulish text-center mt-5 sm:mt-7">
                    Welcome to <span className="text-green-500">LinkGenie</span> - Sign Up
                </h1>
                <p className="text-center text-white mt-2 sm:mt-3 font-mulish">
                    Please fill in your details or sign up using social accounts
                </p>

                {/* Google and LinkedIn Auth */}
                <div className="mb-3 items-center justify-center flex">
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full sm:w-10/12 px-4 py-2.5 mt-5 text-base sm:text-lg text-white bg-green-500 border rounded-lg hover:bg-green-400 flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : (
                            <>
                                <Image
                                    src="/social/google.png"
                                    alt="Google Logo"
                                    width={25}
                                    height={25}
                                    className="mr-2"
                                />
                                Sign up with Google
                            </>
                        )}
                    </button>
                </div>

                <div className="mb-4 items-center justify-center flex">
                    <button
                        onClick={handleLinkedInSignIn}
                        className="w-full sm:w-10/12 px-4 py-2.5 text-base sm:text-lg text-white border rounded-lg hover:bg-green-400 flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : (
                            <>
                                <Image
                                    src="/social/linkedln.png"
                                    alt="LinkedIn Logo"
                                    width={25}
                                    height={25}
                                    className="mr-2"
                                />
                                Sign up with LinkedIn
                            </>
                        )}
                    </button>
                </div>

                <div className="mb-6 text-center">
                    <p className="text-white text-sm sm:text-base">or</p>
                </div>

                <form onSubmit={handleSubmit} className="font-mulish">
                    <div className="mb-4 flex flex-col">
                        <label htmlFor="username" className="px-4 sm:px-14 mb-2 sm:mb-3 text-white">Username<span className="text-red-500">*</span></label>
                        <div className="flex justify-center">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                className="w-full sm:w-10/12 px-4 py-2.5 sm:py-4 text-sm sm:text-base text-white bg-authgray border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mb-4 flex flex-col">
                        <label htmlFor="email" className="px-4 sm:px-14 mb-2 sm:mb-3 text-white">Email address<span className="text-red-500">*</span></label>
                        <div className="flex justify-center">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="w-full sm:w-10/12 px-4 py-2.5 sm:py-4 text-sm sm:text-base text-white bg-authgray border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mb-4 flex flex-col">
                        <label htmlFor="password" className="px-4 sm:px-14 text-white mb-2 sm:mb-3">Password<span className="text-red-500">*</span></label>
                        <div className="flex justify-center">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full sm:w-10/12 px-4 py-2.5 sm:py-4 text-sm sm:text-base text-white bg-authgray border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mb-4 flex flex-col">
                        <label htmlFor="confirmPassword" className="px-4 sm:px-14 text-white mb-2 sm:mb-3">Confirm Password<span className="text-red-500">*</span></label>
                        <div className="flex justify-center">
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                                className="w-full sm:w-10/12 px-4 py-2.5 sm:py-4 text-sm sm:text-base text-white bg-authgray border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mb-4 flex items-center justify-center">
                        <button
                            type="submit"
                            className={`w-full sm:w-10/12 px-4 py-2.5 sm:py-4 text-sm sm:text-lg border-green-500 border text-black bg-white rounded-lg hover:bg-green-400 hover:text-white ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                            ) : 'Sign Up'}
                        </button>
                    </div>

                    <p className="mt-6 text-center text-sm sm:text-base mb-6 text-white">
                        Already have an account?{" "}
                        <Link href="/auth/signin" className="underline hover:underline font-semibold">
                            Sign in
                        </Link>
                    </p>
                </form>
            </section>
        </div>
    );
}
