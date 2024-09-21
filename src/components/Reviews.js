import React from 'react';
import Image from 'next/image';

function Review() {

    return (
        <div className='items-center flex flex-col bg-oval-gradient from-[#324d7e] to-[#0e1726] px-4 md:px-10'>
            <div className='flex space-x-20 py-20'>
                <Image src='/landing/hands.png' width={400} height={400} alt='Line' className='flex-shrink-0' />
                <div className='mt-28'>
                    <h1 className='font-bold text-2xl text-white'>Become a Part of Our <span className='text-green-500'>Vibrant Community.</span></h1>
                    <p className=' mt-5 text-white'>Our community is designed to help you grow professionally and personally. </p>
                    <p className='text-white'>Connect with like-minded individuals, share knowledge, and learn from </p>
                    <p className='text-white'>industry experts.</p>
                    <button className='text-white px-7 py-2 bg-green-500 rounded-lg mt-5'>
                        Join us
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Review;
