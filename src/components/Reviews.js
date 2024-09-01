import React from 'react';

function Review() {

    return (
        <div className='min-h-screen bg-gray-900 text-gray-300 py-10 md:py-20 md:px-20'>
            <h1 className='text-4xl md:text-5xl text-center font-extrabold text-white mb-12'>
                What Our Users<span className='text-green-500'> Say</span>
            </h1>

            <div className='flex flex-col md:flex-row justify-center items-center md:space-x-8 space-y-8 md:space-y-0 px-4'>
                <div className='bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full md:w-1/3'>
                    <p className='text-gray-200 text-lg mb-4 italic'>
                        "LinkGenie has completely transformed how I approach LinkedIn. The AI-generated posts are spot-on and really capture my voice. I've seen a significant increase in engagement since I started using it."
                    </p>
                    <h3 className='text-gray-400 text-xl font-semibold'>Kundisai M.</h3>
                </div>

                <div className='bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full md:w-1/3'>
                    <p className='text-gray-200 text-lg mb-4 font-bold'>
                        "Creating professional LinkedIn posts has never been easier! With LinkGenie, I feel like I have my own personal content assistant. It really understands my style!"
                    </p>
                    <h3 className='text-gray-400 text-xl font-semibold'>Jamie T.</h3>

                </div>

                <div className='bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full md:w-1/3'>
                    <p className='text-gray-200 text-lg mb-4'>
                        "LinkGenie has been a game-changer for my LinkedIn strategy. The posts are engaging and tailored perfectly to my audience. Highly recommend it for anyone looking to up their LinkedIn game!"
                    </p>
                    <h3 className='text-gray-400 text-xl font-semibold'>Jordan K.</h3>

                </div>
            </div>

            <div className='flex flex-col md:flex-row justify-center items-center md:space-x-8 mt-5 space-y-8 md:space-y-0 px-4'>
                <div className='bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full md:w-1/3'>
                    <p className='text-gray-200 text-lg mb-4'>
                        "I can't believe the difference LinkGenie has made! My LinkedIn posts now get so much more attention. It's like having a secret weapon for networking!"
                    </p>
                    <h3 className='text-gray-400 text-xl font-semibold'>Machokoto A.</h3>

                </div>

                <div className='bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full md:w-1/3'>
                    <p className='text-gray-200 text-lg mb-4 font-light'>
                        "Using LinkGenie has been a delightful experience. The interface is user-friendly, and the suggestions are spot on. I feel more confident sharing my thoughts on LinkedIn now!"
                    </p>
                    <h3 className='text-gray-400 text-xl font-semibold'>David L.</h3>

                </div>

                <div className='bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full md:w-1/3'>
                    <p className='text-gray-200 text-lg mb-4'>
                        "I’ve tried several tools, but LinkGenie stands out! The content suggestions are tailored to my style, and I’ve noticed a boost in engagement. Truly a fantastic tool!"
                    </p>
                    <h3 className='text-gray-400 text-xl font-semibold'>Aresho G.</h3>

                </div>
            </div>
        </div>
    );
}

export default Review;