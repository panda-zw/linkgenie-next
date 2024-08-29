import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Review() {
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <FontAwesomeIcon
                key={index}
                icon={faStar}
                className={`text-yellow-400 ${index < rating ? 'opacity-100' : 'opacity-50'}`}
            />
        ));
    };

    return (
        <div className='min-h-screen bg-gray-900 text-gray-300 py-10 md:py-20'>
            <h1 className='text-4xl md:text-5xl text-center font-extrabold text-white mb-12'>
                What Our Users<span className='text-green-500'> Say</span>
            </h1>

            <div className='flex flex-col md:flex-row justify-center items-center md:space-x-8 space-y-8 md:space-y-0 px-4'>
                <div className='bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full md:w-1/3'>
                    <p className='text-gray-200 text-lg mb-4'>
                        “LinkGenie has completely transformed how I approach LinkedIn. The AI-generated posts are spot-on and really capture my voice. I’ve seen a significant increase in engagement since I started using it.”
                    </p>
                    <h3 className='text-gray-400 text-xl font-semibold'>Alex R.</h3>
                    <div className='flex mt-2'>
                        {renderStars(5)}
                    </div>
                </div>

                <div className='bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full md:w-1/3'>
                    <p className='text-gray-200 text-lg mb-4'>
                        “I love how easy it is to create professional and compelling LinkedIn posts with LinkGenie. It’s like having a personal content assistant that understands my style.”
                    </p>
                    <h3 className='text-gray-400 text-xl font-semibold'>Jamie T.</h3>
                    <div className='flex mt-2'>
                        {renderStars(4)}
                    </div>
                </div>

                <div className='bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full md:w-1/3'>
                    <p className='text-gray-200 text-lg mb-4'>
                        “LinkGenie has been a game-changer for my LinkedIn strategy. The posts are engaging and tailored perfectly to my audience. Highly recommend it for anyone looking to up their LinkedIn game!”
                    </p>
                    <h3 className='text-gray-400 text-xl font-semibold'>Jordan K.</h3>
                    <div className='flex mt-2'>
                        {renderStars(4)}
                    </div>
                </div>


            </div>
            <div className='flex flex-col md:flex-row justify-center items-center md:space-x-8 mt-5 space-y-8 md:space-y-0 px-4'>
                <div className='bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full md:w-1/3'>
                    <p className='text-gray-200 text-lg mb-4'>
                        “LinkGenie has completely transformed how I approach LinkedIn. The AI-generated posts are spot-on and really capture my voice. I’ve seen a significant increase in engagement since I started using it.”
                    </p>
                    <h3 className='text-gray-400 text-xl font-semibold'>Alex R.</h3>
                    <div className='flex mt-2'>
                        {renderStars(5)}
                    </div>
                </div>

                <div className='bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full md:w-1/3'>
                    <p className='text-gray-200 text-lg mb-4'>
                        “I love how easy it is to create professional and compelling LinkedIn posts with LinkGenie. It’s like having a personal content assistant that understands my style.”
                    </p>
                    <h3 className='text-gray-400 text-xl font-semibold'>Jamie T.</h3>
                    <div className='flex mt-2'>
                        {renderStars(4)}
                    </div>
                </div>

                <div className='bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full md:w-1/3'>
                    <p className='text-gray-200 text-lg mb-4'>
                        “LinkGenie has been a game-changer for my LinkedIn strategy. The posts are engaging and tailored perfectly to my audience. Highly recommend it for anyone looking to up their LinkedIn game!”
                    </p>
                    <h3 className='text-gray-400 text-xl font-semibold'>Jordan K.</h3>
                    <div className='flex mt-2'>
                        {renderStars(4)}
                    </div>
                </div>


            </div>
        </div>
    );
}

export default Review;
