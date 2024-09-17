"use client";
import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ClientForm() {
    const [textMessage, setTextMessage] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);

    const resultRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponseData(null);

        try {
            const formData = new FormData();
            formData.append("textMessage", textMessage);
            if (imageFile) {
                formData.append("imageUrl", imageFile);
            }


            const res = await fetch('/api/image', {
                method: 'POST',
                body: formData,
            });

            const newData = await res.json();
            setResponseData(newData.content);
            toast.success("Response generated successfully!");

            setTimeout(() => {
                resultRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error generating the response.");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(responseData || 'No content generated.')
            .then(() => toast.success('Response copied to clipboard!'))
            .catch(err => console.error('Failed to copy response:', err));
    };

    return (
        <div className='min-h-screen px-4 lg:px-10 bg-gray-900'>
            <div className='mt-5 max-w-full lg:max-w-3xl mx-auto'>
                <h1 className='text-3xl lg:text-5xl text-gray-200 text-center lg:text-left'>Text and Image Query</h1>
                <p className='mt-5 text-gray-200 text-center lg:text-left text-lg'>
                    Submit a text message and upload an image to get a response.
                </p>

                <form onSubmit={handleSubmit} className='mt-5 space-y-3 lg:space-y-8'>
                    <div>
                        <textarea
                            value={textMessage}
                            onChange={(e) => setTextMessage(e.target.value)}
                            className='mt-2 w-full p-3 text-gray-200 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500'
                            placeholder="Enter your message"
                        />
                    </div>
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}  // Capture the file
                            className='mt-2 w-full p-3 text-gray-200 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500'
                        />
                    </div>

                    <button type='submit' className='mt-5 w-full py-3 bg-green-500 text-white text-lg lg:text-xl rounded hover:bg-green-600 transition'>
                        Submit
                    </button>
                </form>

                <div className='mt-10'>
                    {loading ? (
                        <div className='flex justify-center items-center'>
                            <p className='text-gray-200 text-lg'>Loading...</p>
                        </div>
                    ) : (
                        <div ref={resultRef} className='p-4 bg-gray-800 rounded-lg shadow-lg'>
                            <h2 className='text-xl text-gray-300 mb-2'>Generated Response:</h2>
                            <ReactMarkdown className='text-gray-200'>{responseData || "No content generated."}</ReactMarkdown>
                            <button
                                onClick={handleCopy}
                                className='mt-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700 transition'
                            >
                                Copy Response
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
