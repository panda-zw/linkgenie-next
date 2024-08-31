import React from 'react';

function About() {
    return (
        <div className='min-h-screen bg-gray-900 text-gray-300 py-10 md:py-20 md:px-10'>
            <h1 className='text-4xl md:text-5xl text-center font-extrabold text-white mb-8 md:mb-16'>
                Ab<span className='text-green-500'>out</span>
            </h1>
            <div className='flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-10 px-4 md:px-10'>
                <div className='w-full md:w-6/12'>
                    <h2 className='font-black text-3xl md:text-6xl text-gray-200 mt-4 md:mt-10'>
                        Transform Your Ideas into Impactful LinkedIn Posts with the  <span className='text-green-500'>Power of AI.</span>
                    </h2>
                    <p className='text-gray-200 max-w-full md:max-w-3xl text-base md:text-lg tracking-wider font-light mt-4 md:mt-6'>
                        LinkGenie helps you craft personalized, high-engagement LinkedIn posts that resonate with your audience, enabling you to expand your professional network effortlessly.
                    </p>
                    <a href='/Generate'>
                        <button className='mt-3 w-36 h-12 text-white text-xl bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-lg hover:from-green-500 hover:to-green-700 hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out'>
                            Start Now
                        </button>
                    </a>
                </div>
                <div className='flex flex-wrap justify-center w-full md:w-6/12 space-y-4 md:space-y-0 md:space-x-4'>
                    <img

                        src="/linkd/first.jpeg" loading='lazy' alt="Creative LinkedIn Post Example 1" className='w-48 md:w-52' />
                    <img

                        src="/linkd/second.jpeg" loading='lazy' alt="Creative LinkedIn Post Example 2" className='w-48 md:w-52' />
                </div>
            </div>
        </div>
    );
}

export default About;