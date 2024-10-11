"use client"

import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

export default function ImageForm() {
    const [imageFile, setImageFile] = useState(null);
    const [textMessage, setTextMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const resultRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            Swal.fire({
                icon: 'success',
                title: 'Image selected successfully!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponseData(null);

        const formData = new FormData();
        formData.append('textMessage', textMessage);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            const res = await fetch('/api/image', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Response generation failed");
            }

            const newData = await res.json();
            setResponseData(newData.content);
            Swal.fire({
                icon: 'success',
                title: 'Response generated successfully!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            });

            setTimeout(() => {
                resultRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error generating the response.',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(responseData || 'No content generated.')
            .then(() => Swal.fire({
                icon: 'success',
                title: 'Response copied to clipboard!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            }))
            .catch(err => console.error('Failed to copy response:', err));
    };

    return (
        <div className='min-h-screen px-4 lg:px-10 bg-gray-100 py-20'>
            <div className="py-2 px-2 font-mulish">
                <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-gray-800 bg-gray-100">
                    <span className="inline-block pb-2 border-b-4 border-blue-500">
                        Generate Post from Image
                    </span>
                </h1>
            </div>
            <div className="py-10 px-3 font-mulish">
                <h1 className="text-xl font-semibold">Image Analysis</h1>
                <p>Upload an image and enter a message for analysis.</p>
            </div>

            <div className='border shadow-lg mx-3.5 px-5 py-2 rounded-lg bg-white'>
                <h2 className="text-xl text-gray-600 mt-5">Analyze Image</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-5">
                    <div>
                        <label htmlFor="uploadImage" className="block mb-2">Upload Image File</label>
                        <input
                            id="uploadImage"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-indigo-50 file:text-indigo-700
                            hover:file:bg-indigo-100"
                        />
                    </div>
                    <div>
                        <label htmlFor="textMessage" className="block mb-2">Enter Message</label>
                        <textarea
                            id="textMessage"
                            value={textMessage}
                            onChange={(e) => setTextMessage(e.target.value)}
                            placeholder="Enter your message here..."
                            rows={4}
                            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-3">
                    <button
                        onClick={handleSubmit}
                        disabled={loading || (!imageFile && !textMessage)}
                        className="flex items-center rounded-md border border-slate-300 py-2 px-4 mb-3 mx-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-green-500 hover:border-green-500 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    >
                        {loading ? 'Analyzing...' : 'Analyze'}
                        {!loading && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1.5">
                                <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            <div className="py-5">
                {loading && (
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="w-4 h-4 bg-indigo-500 rounded-full animate-pulse"></div>
                        <div className="w-4 h-4 bg-indigo-500 rounded-full animate-pulse delay-75"></div>
                        <div className="w-4 h-4 bg-indigo-500 rounded-full animate-pulse delay-150"></div>
                        <span className="text-indigo-500 font-medium">Analyzing...</span>
                    </div>
                )}

                {!responseData && !loading && (
                    <div className="mt-5 mb-16 p-7 bg-white shadow-lg rounded-lg mx-3.5">
                        <h2 className="text-lg font-mulish font-semibold">
                            Your analysis result will appear here
                        </h2>
                        <p className="text-gray-700 py-1">
                            No content analyzed yet
                        </p>
                    </div>
                )}

                {responseData && (
                    <div className="mt-5 mb-16 p-5 bg-white shadow-lg rounded-lg mx-3.5">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-semibold">Analysis Result:</h2>
                            <button onClick={handleCopy}>
                                <div className="flex items-center space-x-2 mt-2 cursor-pointer bg-gray-100 hover:bg-gray-200 p-1 px-2 rounded-lg transition ease-in-out duration-300">
                                    <Image src="/icons/copy.png" alt="no image found" width={24} height={24} className='hover:scale-150 transition ease-in-out duration-300' />
                                    <p className="text-sm text-gray-700">Copy to Clipboard</p>
                                </div>
                            </button>
                        </div>
                        <div className="text-gray-700 whitespace-pre-wrap">
                            <ReactMarkdown>{responseData}</ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}