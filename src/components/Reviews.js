import React from 'react';
import Image from 'next/image';

function Review() {

    return (
        <div className='items-center flex flex-col bg-oval-gradient from-[#324d7e] to-[#0e1726] px-4 md:px-10'>
            <div className='flex flex-col lg:flex-row lg:space-x-10 px-6 lg:px-16 w-full lg:w-11/12'>
                <Image src='/tick/tick-circle.png' width={25} height={20} alt='Line' className='flex-shrink-0' />
            </div>

        </div>
    );
}

export default Review;
