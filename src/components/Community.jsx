import React from 'react'
import { motion } from 'framer-motion'

function Community() {
    return (
        <div className='min-h-screen px-10'>
            <div className='flex space-x-3 mt-10'>
                <h1 className='text-5xl text-gray-200'>Recent Community posts</h1>
                <p className='text-lg mt-4 text-gray-200'>(updated periodicaly)</p>
            </div>
            <div className='flex space-x-5 mt-10'>
                <motion.img
                    whileHover={{
                        scale: 1.2,

                    }}
                    src="/linkd/first.jpeg" alt="" className='w-44 rounded' />
                <motion.img
                    whileHover={{
                        scale: 1.2,

                    }}
                    src="/linkd/second.jpeg" alt="" className='w-44 rounded' />
            </div>
        </div>
    )
}

export default Community