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
        <div className='items-center flex flex-col px-4 md:px-10 min-h-screen mt-10'>
            <div className='flex items-center border rounded-lg py-1.5 px-2.5 mt-10 md:mt-20 bg-authgray'>
                <Image src='/flash/flash.png' width={20} height={20} alt='Hero' />
                <h1 className='text-sm text-white ml-2'>Trusted by Over 1000 Users Worldwide</h1>
            </div>

            <div className='flex flex-col items-center mt-8 md:mt-10'>
                <h1 className='text-center text-2xl md:text-3xl w-full md:w-8/12 font-bold text-white'>
                    Craft eye-catching LinkedIn posts in seconds using our AI with no writing skills necessary. Want to project authority and find new clients? Let’s make it happen!
                </h1>
            </div>

            <div className='flex flex-col items-center mt-6 md:mt-10'>
                <p className='text-center text-white w-full md:w-6/12'>
                    Ditch the stress of content creation. With one click, get posts loaded with your personality that magnetically draw in your audience.
                </p>
            </div>

            <div className='mt-5 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
                <button
                    onClick={handleGenerateClick}  // Add click handler for "Generate Post"
                    className='text-white px-8 py-3 hover:bg-green-400 transition ease-out bg-green-500 rounded-lg text-lg w-full md:w-auto'>
                    Get Started
                </button>
                <button
                    onClick={handleExploreClick}  // Add click handler for "Explore LinkGenie"
                    className='text-white px-8 py-3 border hover:bg-green-400 transition ease-out border-white rounded-lg text-lg w-full md:w-auto'>
                    Join Community
                </button>
            </div>

            <div className='mt-16 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-5'>
                <div className='w-full md:w-[421.3px] py-5 rounded-lg bg-authgray px-6 border items-center'>
                    <Image src='/card/ranking.png' width={20} height={20} alt='Hero' />
                    <h1 className='text-white text-lg font-bold mt-2'>AI Post Generation</h1>
                    <p className='text-white mt-2 text-sm'>
                        Elevate your LinkedIn presence with personalized posts that speak directly to your audience.
                    </p>
                </div>

                <div className='w-full md:w-[421.3px] py-5 rounded-lg bg-authgray px-6 border items-center'>
                    <Image src='/card/profile-2user.png' width={20} height={20} alt='Hero' />
                    <h1 className='text-white text-lg font-bold mt-2'>Create Engaging Content</h1>
                    <p className='text-white text-sm mt-2'>
                        Grow your professional network sharply with posts that spark meaningful connections and foster lasting relationships.
                    </p>
                </div>

                <div className='w-full md:w-[421.3px] py-5 rounded-lg bg-authgray px-6 border items-center'>
                    <Image src='/card/crown.png' width={20} height={20} alt='Hero' />
                    <h1 className='text-white text-lg font-bold mt-2'>Network Expansion</h1>
                    <p className='text-white mt-2 text-sm'>
                        Watch your LinkedIn engagement soar with posts that spark curiosity, encourage sharing, & drive meaningful interactions.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Main;
