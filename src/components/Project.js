"use client";
import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";

export default function ClientForm() {
    const [technicalInterests, setTechnicalInterests] = useState("");
    const [projectScope, setProjectScope] = useState("");
    const [industryFocus, setIndustryFocus] = useState("");
    const [learningGoals, setLearningGoals] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const [difficultyLevel, setDifficultyLevel] = useState("");
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);

    const resultRef = useRef(null);

    const messageContent = `
    Technical Interests: ${technicalInterests}
    Project Scope: ${projectScope}
    Industry Focus: ${industryFocus}
    Learning Goals: ${learningGoals}
    Target Audience: ${targetAudience}
    Difficulty Level: ${difficultyLevel}
`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponseData(null);
        try {
            const res = await fetch('/api/finder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userMessage: messageContent }),
            });

            const newData = await res.json();
            setResponseData(newData.content);
            toast.success("Project idea generated successfully!");

            setTimeout(() => {
                resultRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error generating the project idea.");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(responseData || 'No content generated.')
            .then(() => toast.success('Post copied to clipboard!'))
            .catch(err => console.error('Failed to copy post:', err));
    };

    return (
        <div className='min-h-screen px-2 lg:px-4 bg-gray-100 py-20'>
            <div className='py-10'>
                <div className="py-2 px-2 font-mulish">
                    <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-gray-800 bg-gray-100">
                        <span className="inline-block pb-2 border-b-4 border-blue-500">
                            Let&apos;s help you find a project.
                        </span>
                    </h1>
                </div>
                <form onSubmit={handleSubmit} className='border shadow-lg mx-2 px-3 mt-5 py-2 rounded-lg bg-white'>
                    <h1 className="text-lg text-gray-600 mt-2 px-4">Generate Project Idea</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 py-2 px-3">
                        <div className="md:col-span-3 lg:col-span-4">
                            <label htmlFor="technicalInterests" className="block mb-1 text-sm font-medium">Technical Interests</label>
                            <textarea
                                id="technicalInterests"
                                value={technicalInterests}
                                onChange={(e) => setTechnicalInterests(e.target.value)}
                                className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                                placeholder="AI, Web Dev, Blockchain"
                                rows="2"
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="projectScope" className="block mb-1 text-sm font-medium">Project Scope</label>
                            <input
                                type="text"
                                id="projectScope"
                                value={projectScope}
                                onChange={(e) => setProjectScope(e.target.value)}
                                className='bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2'
                                placeholder="full-stack, backend only, research"
                            />
                        </div>
                        <div>
                            <label htmlFor="industryFocus" className="block mb-1 text-sm font-medium">Industry Focus</label>
                            <input
                                type="text"
                                id="industryFocus"
                                value={industryFocus}
                                onChange={(e) => setIndustryFocus(e.target.value)}
                                className='bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2'
                                placeholder="fintech, healthcare, gaming"
                            />
                        </div>
                        <div>
                            <label htmlFor="learningGoals" className="block mb-1 text-sm font-medium">Learning Goals</label>
                            <input
                                type="text"
                                id="learningGoals"
                                value={learningGoals}
                                onChange={(e) => setLearningGoals(e.target.value)}
                                className='bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2'
                                placeholder="React, TensorFlow, Docker"
                            />
                        </div>
                        <div>
                            <label htmlFor="targetAudience" className="block mb-1 text-sm font-medium">Target Audience</label>
                            <input
                                type="text"
                                id="targetAudience"
                                value={targetAudience}
                                onChange={(e) => setTargetAudience(e.target.value)}
                                className='bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2'
                                placeholder="developers, students, general public"
                            />
                        </div>
                        <div>
                            <label htmlFor="difficultyLevel" className="block mb-1 text-sm font-medium">Difficulty Level</label>
                            <input
                                type="text"
                                id="difficultyLevel"
                                value={difficultyLevel}
                                onChange={(e) => setDifficultyLevel(e.target.value)}
                                className='bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2'
                                placeholder="basic, intermediate, advanced"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-2">
                        <button
                            type="submit"
                            className="flex items-center rounded-md border border-slate-300 py-2 px-4 mb-2 mx-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-green-500 hover:border-green-500 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            disabled={loading}
                        >
                            {loading ? 'Generating...' : 'Generate'}
                            {!loading && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1.5">
                                    <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    </div>
                </form>

                <div ref={resultRef} className="py-2">
                    {!responseData && (
                        <div className="mt-2 mb-4 p-4 bg-white shadow-lg rounded-lg mx-2">
                            <h2 className="text-base font-mulish font-semibold">
                                Your post generation here
                            </h2>
                            <p className="text-sm text-gray-700 py-1">
                                no content generated yet
                            </p>
                        </div>
                    )}

                    {responseData && (
                        <div className="mt-2 mb-4 p-3 bg-white shadow-lg rounded-lg mx-2">
                            <h2 className="text-base font-semibold">Generated Post:</h2>
                            <ReactMarkdown className="text-sm text-gray-700">{responseData}</ReactMarkdown>
                            <button onClick={handleCopy}>
                                <div className="flex items-center space-x-2 mt-2 cursor-pointer bg-gray-100 hover:bg-gray-200 p-1 px-2 rounded-lg transition ease-in-out duration-300">
                                    <Image src="/icons/copy.png" alt="Copy" width={24} height={24} className='hover:scale-150 transition ease-in-out duration-300' />
                                    <p className="text-sm text-gray-700">Copy to Clipboard</p>
                                </div>
                            </button>
                        </div>
                    )}
                </div>

                {loading && (
                    <div className="flex items-center justify-center space-x-2 mt-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-75"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-150"></div>
                        <span className="text-sm text-green-500 font-medium">Generating project...</span>
                    </div>
                )}
            </div>
        </div>
    );
}