import React from 'react';
import { motion } from 'framer-motion';

function ReviewCard({ name, review, role }) {
    return (
        <motion.div
            className='w-6/12 mx-auto rounded-lg bg-white border border-gray-200 p-6 text-gray-800 font-light mb-6 shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl'
            whileHover={{ scale: 1.05, translateY: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="w-full flex flex-col items-center text-gray-900">
                <h2 className='text-2xl font-semibold mb-2'>{name}</h2>
                <p className='text-lg text-center font-semibold'>{role}</p>
                <p className='text-lg text-center'>{review}</p>

            </div>
        </motion.div>
    );
}

export default ReviewCard;
