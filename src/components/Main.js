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

    const handleExploreClick = () => {
        if (session) {
            router.push('/Community');
        } else {
            router.push('/auth/signin');
        }
    };

    return (
        <div className='items-center flex flex-col bg-custom-radial px-4 md:px-10 min-h-screen'>
            <div className='flex items-center border rounded-lg py-1.5 px-2.5 mt-10 md:mt-20 bg-authgray'>
                <Image src='/flash/flash.png' width={20} height={20} alt='Hero' />
                <h1 className='text-sm text-white ml-2'>Trusted by Over 300 Users Worldwide</h1>
            </div>

            <div className='flex flex-col items-center mt-8 md:mt-10'>
                <h1 className='text-center text-2xl md:text-3xl w-full md:w-8/12 font-bold text-white'>
                    Create Professional <span className='text-green-500'>LinkedIn Content</span> at the Click of a Button with AI.
                </h1>
            </div>

            <div className='flex flex-col items-center mt-6 md:mt-10'>
                <p className='text-center text-white w-full md:w-6/12'>
                    Effortlessly create engaging LinkedIn posts that showcase your unique style. With just one single click, our AI-powered tool generates content tailored to your voice, helping you stand out and make a lasting impression.
                </p>
            </div>

            <div className='mt-5 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
                <button
                    onClick={handleGenerateClick}  // Add click handler for "Generate Post"
                    className='text-white px-10 py-2 hover:bg-green-400 transition ease-out bg-green-500 rounded-lg'>
                    Generate Post
                </button>
                <button
                    onClick={handleExploreClick}  // Add click handler for "Explore LinkGenie"
                    className='text-white px-7 py-2 border hover:bg-green-400 transition ease-out border-white rounded-lg'>
                    Explore LinkGenie
                </button>
            </div>

            <div className='mt-16 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-5'>
                <div className='w-full md:w-[421.3px] py-5 rounded-lg bg-authgray px-6 border items-center'>
                    <Image src='/card/ranking.png' width={20} height={20} alt='Hero' />
                    <h1 className='text-white text-lg font-bold mt-2'>AI Post Generation</h1>
                    <p className='text-white mt-2 text-sm'>
                        Elevate your LinkedIn presence with personalized posts that speak directly to your audience, crafted by cutting-edge AI technology.
                    </p>
                </div>

                <div className='w-full md:w-[421.3px] py-5 rounded-lg bg-authgray px-6 border items-center'>
                    <Image src='/card/profile-2user.png' width={20} height={20} alt='Hero' />
                    <h1 className='text-white text-lg font-bold mt-2'>Create Engaging Content</h1>
                    <p className='text-white text-sm mt-2'>
                        Grow your professional network sharply with AI-generated posts that spark meaningful connections and foster lasting relationships.
                    </p>
                </div>

                <div className='w-full md:w-[421.3px] py-5 rounded-lg bg-authgray px-6 border items-center'>
                    <Image src='/card/crown.png' width={20} height={20} alt='Hero' />
                    <h1 className='text-white text-lg font-bold mt-2'>Network Expansion</h1>
                    <p className='text-white mt-2 text-sm'>
                        Watch your LinkedIn engagement soar with AI-crafted posts that spark curiosity, encourage sharing, & drive meaningful interactions.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Main;
