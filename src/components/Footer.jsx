import React from 'react'
import { faGithub, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Footer() {
    return (
        <div>
            <footer className='py-20 bg-darky1 text-white'>


                <div className='justify-center items-center flex space-x-5 text-2xl font-semibold '>
                    <a hidden="/community" className='hover:pulse'>Community</a>
                    <a hidden="/generate" className='hover:pulse'>Generate</a>
                    <a hidden="/" className='hover:pulse'>Account</a>
                </div>

                <div className='justify-center items-center flex space-x-8 font-semibold py-10'>
                    <a href="https://fariraimasocha.github.io/farirai.me" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faWhatsapp} className='text-4xl hover:text-gray-400 transition' />
                    </a>
                    <a href="https://github.com/fariraimasocha" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} className='text-4xl hover:text-gray-400 transition' />
                    </a>
                    <a href="https://linkedin.com/in/fariraimasocha" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} className='text-4xl hover:text-gray-400 transition' />
                    </a>
                </div>
            </footer>
        </div>
    )
}

export default Footer
