
import React from 'react';
import Image from 'next/image';


const Community = () => {
    return (
        <div className='min-h-screen px-10'>
            <div className='flex space-x-3 mt-10'>
                <h1 className='text-5xl text-gray-200'>Recent Community Posts</h1>
                <p className='text-lg mt-4 text-gray-200'>(updated periodically)</p>
            </div>
            <div className='flex space-x-5 mt-10'>

                <Image
                    src="/linkd/first.jpeg"
                    loading='lazy'
                    alt="Creative LinkedIn Post 1"
                    width={192}
                    height={192}
                    className='w-48 md:w-52'
                />
                <Image
                    src="/linkd/second.jpeg"
                    loading='lazy'
                    alt="Creative LinkedIn Post 2"
                    width={192}
                    height={192}
                    className='w-48 md:w-52'
                />
            </div>
        </div>
    );
};

export default Community;