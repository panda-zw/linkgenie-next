import React from 'react';
import Image from 'next/image';

function Review() {

    return (
        <div className='items-center flex flex-col bg-[#37558C] px-4 md:px-10'>
            <div className='flex flex-col md:flex-row md:space-x-20 py-10 md:py-20 items-center'>
                <Image src='/landing/hands.png' width={400} height={400} alt='Line' className='flex-shrink-0 mb-8 md:mb-0' />
                <div className='mt-8 md:mt-12 text-center md:text-left'>
                    <h1 className='font-bold text-2xl md:text-3xl text-white'>
                        Become a Part of Our <span className='text-green-500'>Vibrant Community.</span>
                    </h1>
                    <p className='mt-5 text-white'>
                        Our community is designed to help you grow professionally and personally.
                    </p>
                    <p className='text-white'>
                        Connect with like-minded individuals, share knowledge, and learn from
                    </p>
                    <p className='text-white'>
                        industry experts.
                    </p>
                    <button className='text-white px-7 py-2 hover:bg-green-400 transition ease-out bg-green-500 rounded-lg mt-5'>
                        Join us
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Review;
