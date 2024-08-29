import React from 'react';

function Navbar() {
    return (
        <div className='flex justify-between items-center px-8 py-4'>
            <div className='flex space-x-1 items-center'>
                <img src="/favicon/logo.png" alt="loading" loading='lazy' className='w-16' />
                <a href="/">
                    <h1 className='text-4xl font-black text-gray-200'>Ge<span className='text-green-500'>nie</span></h1>
                </a>
                <nav className='flex space-x-6 pl-5'>
                    <a href="/generate" className='text-lg text-gray-200 hover:text-green-500 transition duration-300'>Generate</a>
                    <a href="/community" className='text-lg text-gray-200 hover:text-green-500 transition duration-300'>Community</a>
                </nav>
            </div>
            <div className='flex items-center space-x-4'>
                <button className='w-32 h-10 text-white bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-lg hover:from-green-500 hover:to-green-700 hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out'>
                    Buy Credits
                </button>
                <button className='w-32 h-10 text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-lg hover:from-blue-500 hover:to-blue-700 hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out'>
                    Sign In
                </button>
            </div>
        </div>
    );
}

export default Navbar;
