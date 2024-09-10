"use client";
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

function Navbar() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [credits, setCredits] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [username, setUsername] = useState(session?.user?.username || "");

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
        await signOut({ callbackUrl: '/' });
        fetchCredits();
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleMobileNav = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    };

    return (
        <div className='flex flex-wrap justify-between items-center px-10 py-4 bg-gray-900'>
            <div className='flex items-center space-x-1'>
                <Image
                    src="/favicon/logo.png"
                    alt="logo"
                    loading='lazy'
                    width={44}
                    height={44} />
                <Link href="/">
                    <h1 className='text-2xl sm:text-3xl md:text-4xl font-black text-gray-200'>
                        Ge<span className='text-green-500'>nie</span>
                    </h1>
                </Link>
            </div>

            {status === 'authenticated' && (
                <button onClick={toggleMobileNav} className='sm:hidden text-white'>
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
                            <Link href="/Community" onClick={toggleMobileNav} className='text-xl text-gray-200 hover:text-green-500 transition duration-300'>
                                Community
                            </Link>
                            <Link href="/posts" onClick={toggleMobileNav} className='text-xl text-gray-200 hover:text-green-500 transition duration-300'>
                                Posts
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className='w-28 h-10 text-sm sm:text-base text-white bg-gradient-to-r from-red-400 to-red-600 rounded-full shadow-lg hover:from-red-500 hover:to-red-700 hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out'
                            >
                                Sign Out
                            </button>
                        </nav>
                    )}
                </div>
            )}

            {status === 'authenticated' && (
                <nav className='hidden sm:flex items-center space-x-4 sm:space-x-6 pl-2 sm:pl-5'>
                    <Link href="/Generate" className='text-sm sm:text-lg text-gray-200 hover:text-green-500 transition duration-300'>
                        Generate
                    </Link>
                    <Link href="/Community" className='text-sm sm:text-lg text-gray-200 hover:text-green-500 transition duration-300'>
                        Community
                    </Link>
                    <Link href="/posts" className='text-sm sm:text-lg text-gray-200 hover:text-green-500 transition duration-300'>
                        Posts
                    </Link>
                </nav>
            )}

            <div className='flex items-center space-x-2 sm:space-x-4 mt-4 sm:mt-0'>
                {status === 'authenticated' ? (
                    <>
                        <button className='text-white' onClick={fetchCredits}>
                            <FontAwesomeIcon icon={faRotate} className='text-white' />
                        </button>
                        <span className='text-white'>{credits} Credits</span>
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
                                <Link href="/auth/profile">
                                    <button className='block w-full py-2 px-4 text-left text-gray-200 hover:text-green-500 hover:bg-gray-700'>
                                        Profile
                                    </button>
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className='block w-full py-2 px-4 text-left text-white hover:text-red-500 hover:bg-gray-700'>
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <Link href="/auth/signin">
                        <button className='w-28 sm:w-32 h-8 sm:h-10 text-sm sm:text-base text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-lg hover:from-blue-500 hover:to-blue-700 hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out'>
                            Sign In
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Navbar;
