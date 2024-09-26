"use client";
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { text } from '@fortawesome/fontawesome-svg-core';

function Navbar() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [credits, setCredits] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [username, setUsername] = useState(session?.user?.username || "");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (session) {
            fetchCredits();
        }
    }, [session]);

    const fetchCredits = async () => {
        if (session) {
            try {
                const res = await fetch(`/api/user/${session.user.id}/`);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setCredits(data.credits);
            } catch (error) {
                console.error('Failed to fetch credits:', error);
            }
        }
    };

    const handleSignOut = async () => {
        setLoading(true);
        await signOut({ callbackUrl: '/' });
        setLoading(false);
    };

    const handleProfile = () => {
        setLoading(true);
        router.push('/auth/profile');
        setLoading(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleMobileNav = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    };

    const navbarBackground = status === 'authenticated' ? 'bg-white' : '';
    const logoBackground = status === 'authenticated' ? 'text-black' : 'text-gray-200';
    const textColor = status === 'authenticated' ? 'text-black' : 'text-white';

    return (
        <div className={`flex flex-wrap justify-between items-center px-14 py-4 font-mulish ${navbarBackground}`}>
            <div className='flex items-center space-x-1'>
                <Link href="/">
                    <h1 className={`text-xl sm:text-xl md:text-2xl font-mulish font-bold ${logoBackground}`}>
                        Linkgenie
                    </h1>
                </Link>
            </div>

            {status === 'authenticated' && (
                <button onClick={toggleMobileNav} className={`sm:hidden ${textColor}`}>
                    <FontAwesomeIcon icon={isMobileNavOpen ? faTimes : faBars} size="lg" />
                </button>
            )}

            {isMobileNavOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex flex-col items-center justify-center z-50">
                    <button onClick={toggleMobileNav} className="absolute top-5 right-5 text-white">
                        <FontAwesomeIcon icon={faTimes} size="lg" />
                    </button>
                    {status === 'authenticated' && (
                        <nav className="flex flex-col space-y-6 text-center">
                            <Link href="/Generate" onClick={toggleMobileNav} className='text-xl text-gray-200 hover:text-green-500 transition duration-300'>
                                Generate
                            </Link>
                            <Link href="/posts" onClick={toggleMobileNav} className='text-xl text-gray-200 hover:text-green-500 transition duration-300'>
                                Posts
                            </Link>
                            <Link href="/Community" onClick={toggleMobileNav} className='text-xl text-gray-200 hover:text-green-500 transition duration-300'>
                                Community
                            </Link>
                            <Link href="/Project" onClick={toggleMobileNav} className='text-xl text-gray-200 hover:text-green-500 transition duration-300'>
                                Project
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className={`w-28 h-10 text-sm sm:text-base text-white bg-gradient-to-r from-red-400 to-red-600 rounded-full shadow-lg hover:from-red-500 hover:to-red-700 hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className='flex items-center justify-center'>
                                        <FontAwesomeIcon icon={faRotate} className='animate-spin mr-2' />
                                        Loading...
                                    </span>
                                ) : (
                                    'Sign Out'
                                )}
                            </button>
                        </nav>
                    )}
                </div>
            )}

            {status === 'authenticated' && (
                <nav className='hidden sm:flex items-center space-x-4 sm:space-x-6 pl-2 sm:pl-5'>
                    <Link href="/Generate" className='text-sm sm:text-lg text-gray-800 hover:text-green-500 transition duration-300'>
                        Generate
                    </Link>
                    <Link href="/posts" className='text-sm sm:text-lg text-gray-800 hover:text-green-500 transition duration-300'>
                        Posts
                    </Link>
                    <Link href="/Community" className='text-sm sm:text-lg text-gray-800 hover:text-green-500 transition duration-300'>
                        Community
                    </Link>
                    <Link href="/Project" className='text-sm sm:text-lg text-gray-800 hover:text-green-500 transition duration-300'>
                        Project
                    </Link>
                </nav>
            )}

            <div className='flex items-center space-x-2 sm:space-x-4'>
                {status === 'authenticated' ? (
                    <>
                        <span className='text-black'>{credits} Credits</span>
                        <div className='relative'>
                            <button
                                onClick={toggleDropdown}
                                className='w-10 h-10 sm:w-10 sm:h-10 px-1 py-1 rounded-full ring-2 ring-white bg-green-500 overflow-hidden focus:outline-none'
                            >
                                <h1 className='text-white'>
                                    {username.charAt(0).toUpperCase()}
                                </h1>
                            </button>
                            <div className={`absolute top-12 right-0 w-36 sm:w-40 bg-gray-800 rounded-lg shadow-lg ${isDropdownOpen ? 'block' : 'hidden'}`}>
                                <button
                                    onClick={handleProfile}
                                    className={`block w-full py-2 px-4 text-left text-gray-200 hover:text-green-500 hover:bg-gray-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className='flex items-center justify-center'>
                                            <FontAwesomeIcon icon={faRotate} className='animate-spin mr-2' />
                                            Loading...
                                        </span>
                                    ) : (
                                        'Profile'
                                    )}
                                </button>
                                <button
                                    onClick={handleSignOut}
                                    className={`block w-full py-2 px-4 text-left text-white hover:text-red-500 hover:bg-gray-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className='flex items-center justify-center'>
                                            <FontAwesomeIcon icon={faRotate} className='animate-spin mr-2' />
                                            Loading...
                                        </span>
                                    ) : (
                                        'Sign Out'
                                    )}
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='flex space-x-4'>
                        <Link href="/auth/signin">
                            <button className='w-28 sm:w-28 h-8 sm:h-9 text-sm sm:text-base text-white rounded-lg shadow-lg hover:bg-blue-500 hover:text-white hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out'>
                                Sign in
                            </button>
                        </Link>
                        <Link href="/auth/signup">
                            <button className='w-28 sm:w-28 h-8 sm:h-9 text-sm sm:text-base text-black bg-white rounded-lg shadow-lg hover:bg-green-500 hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out'>
                                Sign up
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
