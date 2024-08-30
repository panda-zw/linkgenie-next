
import React from 'react';


const Community = () => {
    return (
        <div className='min-h-screen px-10'>
            <div className='flex space-x-3 mt-10'>
                <h1 className='text-5xl text-gray-200'>Recent Community Posts</h1>
                <p className='text-lg mt-4 text-gray-200'>(updated periodically)</p>
            </div>
            <div className='flex space-x-5 mt-10'>
                <img

                    src="/linkd/first.jpeg"
                    alt="First post"
                    className='w-44 rounded'
                />
                <img

                    src="/linkd/second.jpeg"
                    alt="Second post"
                    className='w-44 rounded'
                />
            </div>
        </div>
    );
};

export default Community;