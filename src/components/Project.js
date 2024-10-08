"use client";
import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            <div className="py-4 px-2 font-mulish">
                <h1 className="text-lg font-semibold">Let’s help you find a project post.</h1>
                <p>Need an idea for your final year project? Pick one that impresses recruiters and boosts your career.</p>
            </div>
            <form onSubmit={handleSubmit} className='border shadow-lg mx-2 px-3 py-2 rounded-lg bg-white'>
                <h1 className="text-lg text-gray-600 mt-2">Generate Project Idea</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-3">
                    <div>
                        <label htmlFor="technicalInterests" className="block mb-1 text-sm">Technical Interests</label>
                        <input
                            type="text"
                            value={technicalInterests}
                            onChange={(e) => setTechnicalInterests(e.target.value)}
                            className='bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2'
                            placeholder="AI, Web Dev, Blockchain"
                        />
                    </div>
                    <div>
                        <label htmlFor="projectScope" className="block mb-1 text-sm">Project Scope</label>
                        <input
                            type="text"
                            value={projectScope}
                            onChange={(e) => setProjectScope(e.target.value)}
                            className='bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2'
                            placeholder="full-stack, backend only, research"
                        />
                    </div>
                    <div>
                        <label htmlFor="industryFocus" className="block mb-1 text-sm">Industry Focus</label>
                        <input
                            type="text"
                            value={industryFocus}
                            onChange={(e) => setIndustryFocus(e.target.value)}
                            className='bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2'
                            placeholder="fintech, healthcare, gaming"
                        />
                    </div>
                    <div>
                        <label htmlFor="learningGoals" className="block mb-1 text-sm">Learning Goals</label>
                        <input
                            type="text"
                            value={learningGoals}
                            onChange={(e) => setLearningGoals(e.target.value)}
                            className='bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2'
                            placeholder="React, TensorFlow, Docker"
                        />
                    </div>
                    <div>
                        <label htmlFor="targetAudience" className="block mb-1 text-sm">Target Audience</label>
                        <input
                            type="text"
                            value={targetAudience}
                            onChange={(e) => setTargetAudience(e.target.value)}
                            className='bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2'
                            placeholder="developers, students, general public"
                        />
                    </div>
                    <div>
                        <label htmlFor="difficultyLevel" className="block mb-1 text-sm">Difficulty Level</label>
                        <input
                            type="text"
                            value={difficultyLevel}
                            onChange={(e) => setDifficultyLevel(e.target.value)}
                            className='bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2'
                            placeholder="basic, intermediate, advanced"
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-3">
                    <button type='submit'
                        className="px-4 text-sm text-white bg-green-600 hover:bg-green-700 rounded-lg py-1.5"
                        disabled={loading}
                    >
                        {loading ? 'Generating...' : 'Generate'}
                    </button>
                </div>
            </form>


            <div ref={resultRef} className="py-2">
                {!responseData && (
                    <div className="mt-3 mb-8 p-7 bg-white shadow-lg rounded-lg mx-2">
                        <h2 className="text-base font-mulish font-semibold">
                            Your post generation here
                        </h2>
                        <p className="text-sm text-gray-700 py-1">
                            no content generated yet
                        </p>
                    </div>
                )}

                {responseData && (
                    <div ref={resultRef} className="py-2">
                        <div className="mt-3 mb-8 p-3 bg-white shadow-lg rounded-lg mx-2">
                            <h2 className="text-base font-semibold">Generated Post:</h2>
                            <ReactMarkdown className="text-sm text-gray-700">{responseData}</ReactMarkdown>
                            <button onClick={handleCopy} className="px-4 mt-2 text-sm text-white bg-green-600 hover:bg-green-700 rounded-lg py-1.5">Copy to Clipboard</button>
                        </div>
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
    );
}