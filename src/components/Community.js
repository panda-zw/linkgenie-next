import React from 'react';
import Image from 'next/image';

const Community = () => {
    return (
        <div className='min-h-screen px-4 sm:px-10 bg-gray-200 py-20'>
            <div className='flex flex-col sm:flex-row sm:items-center space-y-2 py-5 sm:space-y-0 sm:space-x-3'>
                <h1 className='text-3xl sm:text-5xl text-gray-800'>Recent Community Posts</h1>
                <p className='text-base sm:text-lg text-gray-600'>(updated periodically)</p>
            </div>
            <div className='flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-5 mt-10'>
                <Image
                    src="/linkd/first.jpeg"
                    loading='lazy'
                    alt="Creative LinkedIn Post 1"
                    width={192}
                    height={192}
                    className='w-full sm:w-48 md:w-52'
                />
                <Image
                    src="/linkd/second.jpeg"
                    loading='lazy'
                    alt="Creative LinkedIn Post 2"
                    width={192}
                    height={192}
                    className='w-full sm:w-48 md:w-52'
                />
            </div>
        </div>
    );
};

export default Community;
