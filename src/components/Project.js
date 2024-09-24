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
        <div className='min-h-screen px-4 lg:px-10 bg-gray-100'>
            <div className="py-10 px-3 font-mulish">
                <h1 className=" text-xl font-semibold">Let’s help you find a project post.</h1>
                <p>Need an idea for your final year project? Pick one that impresses recruiters and boosts your career..</p>
            </div>
            <form onSubmit={handleSubmit} className='border shadow-lg mx-3.5 mt-3 px-5 py-5 rounded-lg bg-white'>
                <h1 className="text-lg text-gray-600 mt-5">Generate Project Idea</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-5">
                    <div>
                        <label htmlFor="technicalInterests" className="block mb-2">Technical Interests</label>
                        <input
                            type="text"
                            value={technicalInterests}
                            onChange={(e) => setTechnicalInterests(e.target.value)}
                            className='bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 block w-full p-2.5'
                            placeholder="AI, Web Dev, Blockchain"
                        />
                    </div>
                    <div>
                        <label htmlFor="projectScope" className="block mb-2">Project Scope</label>
                        <input
                            type="text"
                            value={projectScope}
                            onChange={(e) => setProjectScope(e.target.value)}
                            className='bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 block w-full p-2.5'
                            placeholder="full-stack, backend only, research"
                        />
                    </div>
                    <div>
                        <label htmlFor="industryFocus" className="block mb-2">Industry Focus</label>
                        <input
                            type="text"
                            value={industryFocus}
                            onChange={(e) => setIndustryFocus(e.target.value)}
                            className='bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 block w-full p-2.5'
                            placeholder="fintech, healthcare, gaming"
                        />
                    </div>
                    <div>
                        <label htmlFor="learningGoals" className="block mb-2">Learning Goals</label>
                        <input
                            type="text"
                            value={learningGoals}
                            onChange={(e) => setLearningGoals(e.target.value)}
                            className='bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 block w-full p-2.5'
                            placeholder="React, TensorFlow, Docker"
                        />
                    </div>
                    <div>
                        <label htmlFor="targetAudience" className="block mb-2">Target Audience</label>
                        <input
                            type="text"
                            value={targetAudience}
                            onChange={(e) => setTargetAudience(e.target.value)}
                            className='bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 block w-full p-2.5'
                            placeholder="developers, students, general public"
                        />
                    </div>
                    <div>
                        <label htmlFor="difficultyLevel" className="block mb-2">Difficulty Level</label>
                        <input
                            type="text"
                            value={difficultyLevel}
                            onChange={(e) => setDifficultyLevel(e.target.value)}
                            className='bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 block w-full p-2.5'
                            placeholder="basic, intermediate, advanced"
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-5">
                    <button type='submit' className='px-5 text-white bg-green-600 hover:bg-green-700 rounded-lg py-2'>
                        {loading ? 'Generating...' : 'Generate'}
                    </button>
                </div>
            </form>

            {responseData && (
                <div className="py-5">
                    <div className="mt-5 mb-16 p-5 bg-white shadow-lg rounded-lg mx-3.5">
                        <h2 className="text-lg font-semibold">Generated Post:</h2>
                        <ReactMarkdown className="text-gray-700">{responseData}</ReactMarkdown>
                        <button onClick={handleCopy} className="px-5 mt-2 text-white bg-green-600 hover:bg-green-700 rounded-lg py-2">Copy to Clipboard</button>
                    </div>
                </div>
            )}
        </div>
    );
}
