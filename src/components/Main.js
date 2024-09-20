"use client";

import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Main() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleGenerateClick = () => {
        if (session) {
            router.push('/Generate');
        } else {
            router.push('/auth/signin');
        }
    };

    return (
        <div className='items-center flex flex-col'>
            <div className='flex items-center border rounded-lg py-1.5 px-2.5 mt-20 bg-authgray'>
                <Image src='/flash/flash.png' width={20} height={20} alt='Hero' />
                <h1 className='text-sm text-white'>Trusted by Over 300 Users Worldwide</h1>
            </div>

            <h1 className='text-center text-3xl w-5/12 mt-10 font-bold text-white'>Create Professional <span className='text-green-500'>LinkedIn Content</span> at</h1>
            <h1 className='text-center text-3xl w-5/12 mt-2 font-bold text-white'> the Click of a Button with AI.</h1>

            <p className='text-center text-white mt-10 w-7/12'>Effortlessly create engaging LinkedIn posts that showcase your unique style. With just a single click,</p>
            <p className='text-center text-white w-7/12'>our AI-powered tool generates content tailored to your voice, helping you stand out and make a </p>
            <p className='text-center text-white w-7/12'>lasting impression</p>

            <div className='mt-5 flex space-x-4'>
                <button className='text-white px-10 border py-1.5 bg-green-500 rounded-lg'>Generate post</button>
                <button className='text-white px-7 border py-1.5 rounded-lg'>Explore LinkGenie</button>
            </div>

            <div className='mt-5  flex space-x-5'>

            </div>

        </div>

    );
}

export default Main;