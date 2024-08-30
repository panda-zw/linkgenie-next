import React from 'react'
import { faGithub, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Footer() {
    return (
        <div>
            <footer className='py-20 text-white'>
                <div className='justify-center items-center flex space-x-5 text-2xl font-semibold  '>
                    <a href="/community" className='hover:pulse hover:text-gray-400 transition duration-300 ease-out'>Community</a>
                    <a href="/generate" className='hover:pulse hover:text-gray-400 transition duration-300 ease-out'>Generate</a>
                    <a href="/" className='hover:pulse hover:text-gray-400 transition duration-300 ease-out'>Account</a>
                </div>
                <div className='justify-center items-center flex space-x-8 font-semibold py-10 text-xl '>
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
    )
}

export default Footer
