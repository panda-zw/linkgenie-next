import React from 'react';
import Image from 'next/image';

function About() {
    return (
        <div className='min-h-screen bg-white text-gray-300 py-10 border mt-20 items-center justify-center flex'>

            <div className='flex space-x-10 px-16'>
                <div className='mt-7'>
                    <h1 className='font-bold text-3xl text-black'>Key <span className='text-green-500'>Benefits</span> of Our System for Your Productivity.</h1>
                    <p className='text-black mt-5' >Effortless posting, Endless possibilities</p>
                </div>
                <div>
                    <Image src='/landing/laptop.png'
                        width={650}
                        height={650}
                        alt='Laptop' />
                </div>
            </div>

        </div>
    );
}

export default About;