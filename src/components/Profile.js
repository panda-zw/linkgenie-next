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
        <section className="py-10 my-auto dark:bg-gray-900">
            <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
                <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
                    <div>
                        <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-sans font-extrabold mb-2 dark:text-white">
                            Profile
                        </h1>
                        <h2 className="text-gray-400 text-sm mb-4 dark:text-gray-400">Update Profile</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex flex-col items-center">
                                <div className="flex flex-col items-center">
                                    <div className="w-[141px] h-[141px] bg-blue-300/20 rounded-full flex items-center justify-center text-4xl font-bold text-white">
                                        {username.charAt(0).toUpperCase()}
                                    </div>
                                </div>

                            </div>


                            <div className="mb-4">
                                <label htmlFor="username" className="mb-2 dark:text-gray-300">Username</label>
                                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                    required />
                            </div>


                            <div className="mb-4">
                                <label htmlFor="email" className="mb-2 dark:text-gray-300">Email</label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                    required />
                            </div>


                            <div className="mb-4">
                                <label htmlFor="password" className="mb-2 dark:text-gray-300">Password</label>
                                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                    placeholder="Enter new password (optional)" />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="confirm_password" className="mb-2 dark:text-gray-300">Confirm Password</label>
                                <input type="password" id="confirm_password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                    placeholder="Confirm new password" />
                            </div>

                            <div className="w-full rounded-lg bg-green-500 mt-4 text-white text-lg font-semibold">
                                <button type="submit" className="w-full p-4">Update Profile</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
