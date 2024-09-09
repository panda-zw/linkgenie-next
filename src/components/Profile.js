"use client";
<<<<<<< Updated upstream

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { signOut } from "next-auth/react";

export default function Profile() {
  const { data: session, update } = useSession();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/user/update/${session.user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInfo }),
      });

      if (res.ok) {
        toast.success(`user updated`);
      } else {
      }
    } catch (error) {
    } finally {
    }
  };
  return (
    <div>
      <h1>Fatsoe</h1>
      <button onClick={() => signOut}>SignOut</button>
    </div>
  );
=======
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify"; // React-Toastify for notifications

export default function Profile() {
    const { data: session } = useSession();
    const [username, setUsername] = useState(session?.user?.username || "");
    const [email, setEmail] = useState(session?.user?.email || "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await fetch("/api/update-user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: session?.user?.id, // Make sure userId is passed correctly from session
                    username,                 // Update only the fields needed
                    email,                    // Optional: if you're changing email
                    password: password || undefined, // Only send password if it's provided
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("An error occurred while updating the profile.");
            console.error(error);
        }
    };


    return (
        <div className="bg-gray-800 w-full flex justify-center items-center min-h-screen text-white">
            <main className="w-full max-w-2xl p-8 bg-gray-700 rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-8">Profile Update</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-200">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2.5 text-gray-900 bg-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-200">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2.5 text-gray-900 bg-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-200">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2.5 text-gray-900 bg-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter new password (optional)"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-200">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirm_password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2.5 text-gray-900 bg-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Confirm new password"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-5 py-2.5 text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-300"
                        >
                            Update Profile
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
>>>>>>> Stashed changes
}
