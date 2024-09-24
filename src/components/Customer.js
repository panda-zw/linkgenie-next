import React from 'react'
import Image from 'next/image'

function Customer() {
    return (
        <div className='flex items-center justify-center flex-col bg-lbg px-4 md:px-10'>
            <div className='flex flex-col md:flex-row space-x-0 md:space-x-5 mb-24 md:px-32'>
                <div className='mt-0 md:mt-28' id='1'>
                    <h1 className='font-bold text-2xl text-black'>Customer Stories</h1>
                    <Image src='/customer/stars.png' width={250} height={250} className='py-5' />
                    <h1 className='font-mulish text-xl mt-5 w-10/12'>The best AI tool I’ve ever secured.
                        Professional, efficient, and integrates perfectly with everything I want.
                        Highly recommended!</h1>
                    <div className='flex mt-5 space-x-3'>
                        <Image src='/customer/user.png' width={50} height={50} className='rounded-full' />
                        <div className='font-mulish'>
                            <h1 className='font-bold'>John Doe</h1>
                            <h1 className='font-light'>CEO, Designer</h1>
                        </div>
                    </div>
                </div>
                <div className='mt-0 md:mt-40' id='2'>
                    <div className='py-3 border-b border-gray-400'>
                        <h1 className='font-mulish text-3xl text-black'>100%</h1>
                        <p className='font-mulish text-lg text-lgray'>of users like LinkGenie, find our solution efficient and professional</p>
                    </div>
                    <div className='mt-3'>
                        <h1 className='font-mulish text-3xl text-black'>98%</h1>
                        <p className='font-mulish text-lg text-lgray'>of users appreciate the hassle-free tool with their professional profile.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customer