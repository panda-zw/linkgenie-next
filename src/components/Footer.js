import React from 'react';
import { faGithub, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';

function Footer() {
    return (
        <div>
            <footer className='py-10 md:py-20 text-white bg-custom-radial'>


                <div className='flex items-center justify-center flex-col'>
                    <div className='flex items-center border rounded-lg py-1.5 px-2.5 mt-5 md:mt-10 bg-authgray'>
                        <Image src='/flash/flash.png' width={20} height={20} alt='Hero' />
                        <h1 className='text-sm text-white ml-2'>Let’s use it now</h1>
                    </div>
                </div>



                <div className='items-center justify-center flex flex-col text-center px-4 md:px-0'>
                    <h1 className='font-bold text-2xl md:text-3xl text-white mt-5 md:mt-10 w-full md:w-6/12'>
                        Transform your Ideas into <span className='text-green-500'>Impactful LinkedIn Posts</span> with the power of AI.
                    </h1>
                    <p className='mt-5 text-white w-full md:w-6/12'>
                        Effortlessly create engaging LinkedIn posts that showcase your unique style. With just a single click, our AI-powered tool generates content tailored to your voice, helping you stand out and make a lasting impression.
                    </p>
                    <Link href='/auth/signin'>
                        <button className='text-white px-7 hover:bg-green-400 transition ease-out  py-2 bg-green-500 rounded-lg mt-5'>
                            Start now
                        </button>
                    </Link>

                    <p className='mt-5 text-white'>
                        For any issues, email <a href="mailto:fariraimasocha@linkgenie.one" className='text-green-500'>fariraimasocha@linkgenie.one</a>
                    </p>
                </div>
                <div className='justify-center items-center flex space-x-10 font-semibold py-10 text-2xl'>
                    <a href="https://fariraimasocha.github.io/farirai.me">
                        <FontAwesomeIcon icon={faGithub} width='40px' className='hover:text-gray-400' />
                    </a>
                    <a href="https://github.com/fariraimasocha">
                        <FontAwesomeIcon icon={faLinkedin} width='40px' className='hover:text-gray-400' />
                    </a>
                    <a href="https://linkedin.com/in/fariraimasocha">
                        <FontAwesomeIcon icon={faWhatsapp} width='40px' className='hover:text-gray-400' />
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
