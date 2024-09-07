"use client";

import React from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';


function Credits() {
    const { data: session, status } = useSession();
    const currentUser = session?.user;

    const handleUpgrade = async () => {
        if (!currentUser) {
            console.error('No user is currently logged in.');
            toast.error('No user is currently logged in.');
            return;
        }

        try {
            const response = await fetch('/api/credits/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: currentUser.id }),
            });

            if (response.ok) {
                console.log('Credits incremented successfully');
                toast.success('Credits incremented successfully!');
            } else {
                const error = await response.json();
                console.error('Error incrementing credits:', error.message);
                toast.error('An error occurred while buying credits.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="bg-gray-900 justify-center mx-auto min-h-screen">
            <div>
                <h2 className="text-3xl font-bold text-gray-100 text-center mt-3 sm:text-5xl">Pricing</h2>
                <p className="max-w-3xl mx-auto mt-4 text-xl text-gray-300 text-center">
                    Get started on our free plan and upgrade when you are ready.
                </p>
            </div>
            <div className="mt-10 container space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
                <div className="relative p-8 border border-gray-700 rounded-2xl shadow-sm flex flex-col bg-gray-800">
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-100">Free</h3>
                        <p className="mt-4 flex items-baseline text-gray-100">
                            <span className="text-5xl font-extrabold tracking-tight">$0</span>
                            <span className="ml-1 text-xl font-semibold text-gray-400">/month</span>
                        </p>
                        <p className="mt-6 text-gray-400">You just want to discover</p>
                        <ul role="list" className="mt-6 space-y-6">
                            <li className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-400" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span className="ml-3 text-gray-100">5 Credits</span>
                            </li>
                            <li className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-400" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span className="ml-3 text-gray-100">Generate post (1 credit)</span>
                            </li>
                            <li className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-400" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span className="ml-3 text-gray-100">View Community Posts</span>
                            </li>
                        </ul>
                    </div>
                    <a className="bg-emerald-600 text-white hover:bg-emerald-700 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
                        href="/auth/login">Signup for free</a>
                </div>
                <div className="relative p-8 border border-gray-700 rounded-2xl shadow-sm flex flex-col bg-gray-800">
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-100">Pro</h3>
                        <p className="absolute top-0 py-1.5 px-4 bg-emerald-500 text-white rounded-full text-xs font-semibold uppercase tracking-wide transform -translate-y-1/2">
                            Most popular
                        </p>
                        <p className="mt-4 flex items-baseline text-gray-100">
                            <span className="text-5xl font-extrabold tracking-tight">$5</span>
                            <span className="ml-1 text-xl font-semibold text-gray-400">/month</span>
                        </p>
                        <p className="mt-6 text-gray-400">You want to grow your LinkedIn profile swiftly</p>
                        <ul role="list" className="mt-6 space-y-6">
                            <li className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-400" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span className="ml-3 text-gray-100">30 credits</span>
                            </li>
                            <li className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-400" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span className="ml-3 text-gray-100">Powered by GPT-4 (more accurate)</span>
                            </li>
                            <li className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-400" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span className="ml-3 text-gray-100">Generate post (1 credit)</span>
                            </li>
                            <li className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-400" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span className="ml-3 text-gray-100">Community Access</span>
                            </li>
                            <li className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-400" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span className="ml-3 text-gray-100">Post To Community</span>
                            </li>
                        </ul>
                    </div>
                    <button
                        className="bg-emerald-500 text-white hover:bg-emerald-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
                        onClick={handleUpgrade} // Call handleUpgrade on click
                    >
                        Upgrade
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Credits;
