import React from 'react';


function Navbar() {
    return (
        <div className='flex flex-wrap justify-between items-center px-4 py-4'>
            <div className='flex items-center space-x-1'>
                <img src="/favicon/logo.png" alt="loading" loading='lazy' className='w-12 sm:w-16' />
                <a href="/">
                    <h1 className='text-2xl sm:text-3xl md:text-4xl font-black text-gray-200'>Ge<span className='text-green-500'>nie</span></h1>
                </a>
                <nav className='hidden sm:flex space-x-4 sm:space-x-6 pl-2 sm:pl-5'>
                    <a href="/Generate" className='text-sm sm:text-lg text-gray-200 hover:text-green-500 transition duration-300'>Generate</a>
                    <a href="/Community" className='text-sm sm:text-lg text-gray-200 hover:text-green-500 transition duration-300'>Community</a>
                </nav>
            </div>
            <div className='flex items-center space-x-2 sm:space-x-4 mt-4 sm:mt-0'>
                <button className='w-28 sm:w-32 h-8 sm:h-10 text-sm sm:text-base text-white bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-lg hover:from-green-500 hover:to-green-700 hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out'>
                    Buy Credits
                </button>
                <a href="/signin">
                    <button className='w-28 sm:w-32 h-8 sm:h-10 text-sm sm:text-base text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-lg hover:from-blue-500 hover:to-blue-700 hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out'>
                        Sign In
                    </button>
                </a>

            </div>
        </div>
    );
}

export default Navbar;
