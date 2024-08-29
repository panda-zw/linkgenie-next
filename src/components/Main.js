import React from 'react';

function Main() {
    return (
        <div className='px-4 py-8 md:px-8 md:py-12 mt-10'>
            <div id='images' className='flex flex-wrap justify-center space-x-4 space-y-4 md:space-y-0'>
                <img src="/notes/note1.png" loading='lazy' alt="Note 1" className='w-48 md:w-60' />
                <img src="/notes/note5.png" loading='lazy' alt="Note 5" className='w-48 md:w-60' />
                <img src="/notes/note3.png" loading='lazy' alt="Note 3" className='w-48 md:w-60' />
                <img src="/notes/note4.png" loading='lazy' alt="Note 4" className='w-48 md:w-60' />
                <img src="/notes/note2.png" loading='lazy' alt="Note 2" className='w-48 md:w-60' />
            </div>

            <div id='main' className='flex flex-col items-center mx-auto space-y-8 md:space-y-10 mt-12'>
                <h1 className='text-4xl md:text-7xl text-center font-black text-gray-200'>
                    Generate LinkedIn Posts with AI at the Click of a
                    <span className='text-green-500'> Button</span>
                </h1>
                <p className='text-center text-gray-200 max-w-lg md:max-w-3xl text-base md:text-lg tracking-wider font-light'>
                    Effortlessly create engaging LinkedIn posts that showcase your unique style.
                    With just a single click, our AI-powered tool generates content tailored to your voice,
                    helping you stand out and make a lasting impression.
                </p>
                <div className='flex justify-center'>
                    <button className='w-32 h-10 md:w-36 md:h-12 text-white text-sm md:text-xl bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-lg hover:from-green-500 hover:to-green-700 hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out'>
                        Generate
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Main;
