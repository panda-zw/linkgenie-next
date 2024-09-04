"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SignUp() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        console.log("Executed")
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
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
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <section className="w-full max-w-md p-8 bg-gray-800 rounded shadow-md">
                <h1 className="py-3 text-center text-2xl font-black text-white">
                    <span className="text-green-400">Genie</span> - Sign Up
                </h1>
                <button className="mb-4 w-full flex items-center justify-center rounded bg-gray-700 px-4 py-2 text-sm text-white transition hover:bg-gray-600">
                    <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                    Sign up with Google
                </button>
                <button className="mb-4 w-full flex items-center justify-center rounded bg-gray-700 px-4 py-2 text-sm text-white transition hover:bg-gray-600">
                    <FontAwesomeIcon icon={faGithub} className="mr-2" />
                    Sign up with GitHub
                </button>
                <div className="mb-6 text-center">
                    <p className="text-gray-400 text-sm">Or, sign up with your email</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="w-full px-4 py-2 text-sm text-white bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
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
                    <div className="mb-4">
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            className="w-full px-4 py-2 text-sm text-white bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-400"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <p className="mt-6 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link href="/auth/signin" className="text-blue-500 hover:underline">
                        Sign in
                    </Link>
                </p>
            </section>
        </div>
    );
}
