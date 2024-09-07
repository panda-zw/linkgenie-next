"use client";
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Navbar() {
    const { data: session, status, update } = useSession();
    const router = useRouter();

    const handleSignOut = () => {
        signOut({ callbackUrl: '/' });
    };

    return (
        <div className='flex flex-wrap justify-between items-center px-4 py-4'>
            <div className='flex items-center space-x-1'>
                <img src="/favicon/logo.png" alt="loading" loading='lazy' className='w-12 sm:w-16' />
                <Link href="/">
                    <h1 className='text-2xl sm:text-3xl md:text-4xl font-black text-gray-200'>Ge<span className='text-green-500'>nie</span></h1>
                </Link>
                <nav className='hidden sm:flex space-x-4 sm:space-x-6 pl-2 sm:pl-5'>
                    <Link href="/Generate" className='text-sm sm:text-lg text-gray-200 hover:text-green-500 transition duration-300'>Generate</Link>
                    <Link href="/Community" className='text-sm sm:text-lg text-gray-200 hover:text-green-500 transition duration-300'>Community</Link>
                </nav>
            </div>
            <div className='flex items-center space-x-2 sm:space-x-4 mt-4 sm:mt-0'>
                {status === 'authenticated' ? (
                    <>
                        <span className='text-white'>{session.user.credits} Credits</span>
                        <button
                            onClick={handleSignOut}
                            className='w-28 sm:w-32 h-8 sm:h-10 text-sm sm:text-base text-white bg-gradient-to-r from-red-400 to-red-600 rounded-full shadow-lg hover:from-red-500 hover:to-red-700 hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out'
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    <Link href="/auth/signin">
                        <button className='w-28 sm:w-32 h-8 sm:h-10 text-sm sm:text-base text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-lg hover:from-blue-500 hover:to-blue-700 hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out'>
                            Sign In
                        </button>
                    </Link>
                )}
                <Link href="/credits">
                    <button className='w-28 sm:w-32 h-8 sm:h-10 text-sm sm:text-base text-white bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-lg hover:from-green-500 hover:to-green-700 hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out'>
                        Buy Credits
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
