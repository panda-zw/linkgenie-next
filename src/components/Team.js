import React from 'react';
import Image from 'next/image';

function Team() {
    return (
        <div className='items-center flex flex-col bg-white px-4 md:px-10'>
            <div className='flex flex-col md:flex-row md:space-x-20 py-10 md:py-20 items-center'>
                <div className='mt-8 md:mt-20 text-center md:text-left'>
                    <h1 className='text-lg text-green-500'>OUR TEAM</h1>
                    <h1 className='font-bold text-2xl md:text-3xl md:mt-5 text-black'>On a Mission to Unlock Creativity.</h1>
                    <p className='mt-5 text-lgray'>
                        Our mission is to unlock creativity, unleash innovation, and
                    </p>
                    <p className='text-lgray'>
                        transform the way professionals connect, collaborate, and
                    </p>
                    <p className='text-lgray'>
                        communicate. We believe that everyone deserves the tools and
                    </p>
                    <p className='text-lgray'>
                        committed to making that vision a reality.
                    </p>
                </div>
                <Image src='/landing/team.jpg' width={500} height={500} alt='Team' className='mt-8 md:mt-14 flex-shrink-0 rounded-lg' />
            </div>
        </div>
    );
}

export default Team;
