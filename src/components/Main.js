import React from 'react';
import Image from 'next/image'; // Import the Image component

function Main() {
    return (
        <div className='px-4 py-8 md:px-8 md:py-12 mt-10'>
            <div id='images' className='flex flex-wrap justify-center space-x-4 space-y-4 md:space-y-0'>
                <Image
                    src="/notes/note1.png"
                    loading='lazy'
                    alt="Note 1"
                    width={192} // Specify the width
                    height={192} // Specify the height
                    className='w-48 md:w-60'
                />
                <Image
                    src="/notes/note5.png"
                    loading='lazy'
                    alt="Note 5"
                    width={192}
                    height={192}
                    className='w-48 md:w-60'
                />
                <Image
                    src="/notes/note3.png"
                    loading='lazy'
                    alt="Note 3"
                    width={192}
                    height={192}
                    className='w-48 md:w-60'
                />
                <Image
                    src="/notes/note4.png"
                    loading='lazy'
                    alt="Note 4"
                    width={192}
                    height={192}
                    className='w-48 md:w-60'
                />
                <Image
                    src="/notes/note2.png"
                    loading='lazy'
                    alt="Note 2"
                    width={192}
                    height={192}
                    className='w-48 md:w-60'
                />
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
                    <a href='/Generate'>
                        <button className='w-32 h-10 md:w-36 md:h-12 text-white text-sm md:text-xl bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-lg hover:from-green-500 hover:to-green-700 hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out'>
                            Generate
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Main;