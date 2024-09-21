import React from 'react';
import Image from 'next/image';

function Team() {
    return (
        <div className='items-center flex flex-col bg-white px-4 md:px-10'>
            <div className='flex space-x-20 py-20'>
                <div className='mt-28'>
                    <h1 className='text-lg text-green-500'>OUR TEAM</h1>
                    <h1 className='font-bold text-2xl text-black'>On a Mission to Unlock Creativity.</h1>
                    <p className=' mt-5 text-black text-lg'>Our mission is to unlock creativity, unleash innovation, and </p>
                    <p className='text-black text-lg'>transform the way professionals connect, collaborate, and </p>
                    <p className='text-black text-lg'>communicate. We believe that everyone deserves the tools and</p>
                    <p className='text-black text-lg'>committed to making that vision a reality.</p>
                </div>
                <Image src='/landing/team.jpg' width={500} height={500} alt='Line' className='mt-14 flex-shrink-0 rounded-lg' />
            </div>

        </div>
    )
}

export default Team
