import React from 'react';
import Image from 'next/image';

function About() {
    return (
        <div className='min-h-screen bg-white text-gray-300 py-10 border mt-20 flex items-center justify-center'>

            <div className='flex flex-col lg:flex-row lg:space-x-10 px-6 lg:px-16 w-full lg:w-11/12'>
                <div className='mt-7'>
                    <h1 className='font-bold text-xl lg:text-2xl text-black'>
                        Key <span className='text-green-500'>Benefits</span> of Our System for Your Productivity.
                    </h1>
                    <p className='text-black mt-5'>Effortless posting, Endless possibilities</p>


                    <div className='mt-8 lg:mt-12 flex items-start space-x-4'>
                        <Image
                            src='/tick/tick-circle.png'
                            width={25}
                            height={20}
                            alt='Line'
                            className='flex-shrink-0'
                        />
                        <div>
                            <div className='flex flex-col'>
                                <h1 className='text-black font-bold mt-0'>Craft a Unique Voice</h1>
                                <p className='text-black mt-2'>Unlock your unique voice and reach new heights of professional success while consistently elevating your personal brand.</p>
                            </div>
                        </div>
                    </div>


                    <div className='mt-8 lg:mt-12 flex items-start space-x-4'>
                        <Image
                            src='/tick/tick-circle.png'
                            width={25}
                            height={20}
                            alt='Line'
                            className='flex-shrink-0'
                        />
                        <div>
                            <div className='flex flex-col'>
                                <h1 className='text-black font-bold mt-0'>Topic Idea Generation</h1>
                                <p className='text-black mt-2'>Break through creative blocks with AI-driven topic idea generation: Fresh perspectives guaranteed.</p>
                            </div>
                        </div>
                    </div>


                    <div className='mt-8 lg:mt-12 flex items-start space-x-4'>
                        <Image
                            src='/tick/tick-circle.png'
                            width={25}
                            height={20}
                            alt='Line'
                            className='flex-shrink-0'
                        />
                        <div>
                            <div className='flex flex-col'>
                                <h1 className='text-black font-bold mt-0'>Customizable Formats</h1>
                                <p className='text-black mt-2'>Align your posts with your brand identity using custom formats.</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='w-full lg:w-[95%] mt-10 lg:mt-0'>
                    <Image
                        src='/landing/laptop.png'
                        width={670}
                        height={670}
                        alt='Laptop'
                        className='w-full h-auto'
                    />
                </div>
            </div>

        </div>
    );
}

export default About;
