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
        <div className='min-h-screen px-4 lg:px-10 bg-gray-900'>
            <div className='mt-5 max-w-full lg:max-w-3xl mx-auto'>
                <h1 className='text-3xl lg:text-5xl text-gray-200 text-center lg:text-left'>Project Finder</h1>
                <p className='mt-5 text-gray-200 text-center lg:text-left text-lg'>
                    Need an idea for your final year project? Pick one that impresses recruiters and boosts your career.
                </p>

                <form onSubmit={handleSubmit} className='mt-5 space-y-3 lg:space-y-8'>
                    <div>
                        <input
                            type="text"
                            value={technicalInterests}
                            onChange={(e) => setTechnicalInterests(e.target.value)}
                            className='mt-2 w-full p-3 text-gray-200 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500'
                            placeholder="Technical Interests (e.g., AI, Web Dev, Blockchain)"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={projectScope}
                            onChange={(e) => setProjectScope(e.target.value)}
                            className='mt-2 w-full p-3 text-gray-200 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500'
                            placeholder="Preferred Project Scope (e.g., full-stack, backend only, research)"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={industryFocus}
                            onChange={(e) => setIndustryFocus(e.target.value)}
                            className='mt-2 w-full p-3 text-gray-200 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500'
                            placeholder="Industry Focus (e.g., fintech, healthcare, gaming)"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={learningGoals}
                            onChange={(e) => setLearningGoals(e.target.value)}
                            className='mt-2 w-full p-3 text-gray-200 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500'
                            placeholder="Technologies/Skills to Learn (e.g., React, TensorFlow, Docker)"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={targetAudience}
                            onChange={(e) => setTargetAudience(e.target.value)}
                            className='mt-2 w-full p-3 text-gray-200 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500'
                            placeholder="Target Audience (e.g., developers, students, general public)"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={difficultyLevel}
                            onChange={(e) => setDifficultyLevel(e.target.value)}
                            className='mt-2 w-full p-3 text-gray-200 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500'
                            placeholder="Preferred Difficulty Level (basic, intermediate, advanced)"
                        />
                    </div>

                    <button type='submit' className='mt-5 w-full py-3 bg-green-500 text-white text-lg lg:text-xl rounded hover:bg-green-600 transition'>
                        Generate
                    </button>
                </form>

                <div className='mt-10'>
                    {loading ? (
                        <div className='flex justify-center items-center'>
                            <p className='text-gray-200 text-lg'>Loading...</p>
                        </div>
                    ) : (
                        <div ref={resultRef} className='p-4 bg-gray-800 rounded-lg shadow-lg'>
                            <h2 className='text-xl text-gray-300 mb-2'>Generated Post:</h2>
                            <ReactMarkdown className='text-gray-200'>{responseData || "No content generated."}</ReactMarkdown>
                            <button
                                onClick={handleCopy}
                                className='mt-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700 transition'
                            >
                                Copy Post
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
