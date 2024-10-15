"use client";
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [credits, setCredits] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [username, setUsername] = useState(session?.user?.username || "");
    const [email, setEmail] = useState(session?.user?.email || "");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (session) {
            fetchCredits();
        }
    }, [session]);

    const fetchCredits = async () => {
        if (session) {
            try {
                const res = await fetch(`/api/user/${session.user.email}/`);
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

    const navbarBackground = status === 'authenticated' ? 'bg-white shadow-md' : 'bg-transparent';
    const logoBackground = status === 'authenticated' ? 'text-gray-800' : 'text-white';
    const textColor = status === 'authenticated' ? 'text-gray-700' : 'text-white';

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 flex flex-wrap justify-between items-center px-6 sm:px-10 py-4 font-mulish ${navbarBackground} transition-all duration-300`}>
            <div className='flex items-center space-x-2'>
                <Link href="/">
                    <h1 className={`text-xl sm:text-2xl font-bold ${logoBackground} hover:text-green-500 transition duration-300`}>
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
                            <Link href="/Posts" onClick={toggleMobileNav} className='text-xl text-gray-200 hover:text-green-500 transition duration-300'>
                                Posts
                            </Link>
                            <Link href="/Community" onClick={toggleMobileNav} className='text-xl text-gray-200 hover:text-green-500 transition duration-300'>
                                Community
                            </Link>
                            <Link href="/Project" onClick={toggleMobileNav} className='text-xl text-gray-200 hover:text-green-500 transition duration-300'>
                                Project
                            </Link>
                            <Link href="/Audio" onClick={toggleMobileNav} className='text-xl text-gray-200 hover:text-green-500 transition duration-300'>
                                Audio
                            </Link>
                            <Link href="/Improve" onClick={toggleMobileNav} className='text-xl text-gray-200 hover:text-green-500 transition duration-300'>
                                Improve
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
                                    'Logout'
                                )}
                            </button>
                        </nav>
                    )}
                </div>
            )}

            {status === 'authenticated' && (
                <nav className='hidden sm:flex items-center space-x-6'>
                    {['Generate', 'Project', 'Posts', 'Community', 'Audio', 'Improve'].map((item) => (
                        <Link key={item} href={`/${item}`} className={`text-sm font-medium ${textColor} hover:text-green-500 transition duration-300`}>
                            {item}
                        </Link>
                    ))}
                </nav>
            )}

            <div className='flex items-center space-x-4'>
                {status === 'authenticated' ? (
                    <>
                        <span className={`text-sm font-medium ${textColor}`}>{credits} Credits</span>
                        <div className='relative'>
                            <button
                                onClick={toggleDropdown}
                                className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white focus:outline-none hover:from-green-500 hover:to-blue-600 transition duration-300"
                            >
                                {session?.user?.email ? (
                                    session.user.email.charAt(0).toUpperCase()
                                ) : (
                                    "?"
                                )}
                            </button>
                            <div className={`absolute top-12 right-0 bg-white rounded-lg shadow-xl ${isDropdownOpen ? 'block' : 'hidden'}`}>
                                <button
                                    onClick={handleProfile}
                                    className='block w-full py-2 px-4 text-left text-gray-700 hover:bg-gray-100 transition duration-300'
                                >
                                    Profile
                                </button>
                                <button
                                    onClick={handleSignOut}
                                    className='block w-full py-2 px-4 text-left text-red-600 hover:bg-gray-100 transition duration-300'
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='flex space-x-4'>
                        <Link href="/auth/signin">
                            <button className='px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-full hover:bg-green-600 transition duration-300'>Sign in</button>
                        </Link>
                        <Link href="/auth/signup">
                            <button className='px-4 py-2 text-sm font-medium text-green-500 bg-white rounded-full hover:bg-gray-100 transition duration-300'>Sign up</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
