import React from 'react'
import { faGithub, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Footer() {
    return (
        <div>
            <footer className='py-20 text-white'>
                <div className='justify-center items-center flex space-x-10 font-semibold py-10 text-4xl '>
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
