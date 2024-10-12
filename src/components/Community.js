import React from 'react';
import Image from 'next/image';

const Community = () => {
    return (
        <div className='min-h-screen px-4 sm:px-10 bg-gray-200 py-20 font-mulish'>
            <div className='flex flex-col sm:flex-row sm:items-center space-y-2 py-5 sm:space-y-0 sm:space-x-3'>
                <div className="py-2 px-2 font-mulish">
                    <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-gray-800">
                        <span className="inline-block pb-2 border-b-4 border-blue-500">
                            Be Part of Our Community
                        </span>
                    </h1>
                </div>
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
