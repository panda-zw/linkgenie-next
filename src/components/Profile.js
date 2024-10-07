"use client";
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
                    userId: session?.user?.id,
                    username,
                    email,
                    password: password || undefined,
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
        <div className='min-h-screen px-2 lg:px-4 bg-gray-200 font-mulish'>
            <div className="container mx-auto px-4 py-8 mb-20">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Profile</h1>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex items-center justify-center mb-6">
                            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                                {username.charAt(0).toUpperCase()}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">Username</label>
                                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                                    required />
                            </div>

                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                                    required />
                            </div>

                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">New Password</label>
                                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-800"
                                    placeholder="Enter new password (optional)" />
                            </div>

                            <div>
                                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-700">Confirm New Password</label>
                                <input type="password" id="confirm_password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-800"
                                    placeholder="Confirm new password" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="w-full bg-green-500 mb-10 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200">
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
