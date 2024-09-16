"use client";
import React, { useState } from 'react';

export default function ClientForm() {
    const [projectName, setProjectName] = useState("");
    const [projectInfo, setProjectInfo] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectTools, setProjectTools] = useState("");
    const [familiarity, setFamiliarity] = useState("");
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);

    const messageContent = {
        projectName,
        projectInfo,
        projectDescription,
        projectTools,
        familiarity
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("messageContent:", messageContent);
        try {
            const response = await fetch('/api/groq', {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userMessage: messageContent })
            });
            console.log("Response:", response.data);
            setResponseData(response.data);
        } catch (error) {
            console.error("Error:", error);
            setResponseData(null);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='items-center justify-center flex'>
            <div className='flex-col flex space-y-10 mt-20'>
                <input className='h-10' name="projectName" type='text' value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Project Name" />
                <input className='h-10' name="projectInfo" type='text' value={projectInfo} onChange={(e) => setProjectInfo(e.target.value)} placeholder="Project Info" />
                <input className='h-10' name="projectDescription" type='text' value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} placeholder="Project Description" />
                <input className='h-10' name="projectTools" type='text' value={projectTools} onChange={(e) => setProjectTools(e.target.value)} placeholder="Project Tools" />
                <input className='h-10' name="familiarity" type='text' value={familiarity} onChange={(e) => setFamiliarity(e.target.value)} placeholder="Familiarity" />
                <button type='submit' className='bg-white text-gray-900 rounded-sm h-10'>
                    Submit
                </button>
            </div>
            {loading && <p>Loading...</p>}
            {responseData && (
                <div className="response mt-4 p-4 border border-gray-300 rounded">
                    <h2 className="text-lg font-bold">Response:</h2>
                    <p>{responseData}</p>
                </div>
            )}
        </form>
    );
}