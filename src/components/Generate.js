"use client";

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function Generate() {
    const [userMessage, setUserMessage] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [postCount, setPostCount] = useState(1);
    const [writingStyle, setWritingStyle] = useState('professional');
    const [voiceType, setVoiceType] = useState('authoritative');
    const [topic, setTopic] = useState('');
    const [field, setField] = useState('tech');
    const [includeHashtags, setIncludeHashtags] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const messageContent = `
            ${userMessage}
            Writing Style: ${writingStyle}
            Voice Type: ${voiceType}
            Topic: ${topic}
            Field: ${field}
            Include Hashtags: ${includeHashtags ? 'Yes' : 'No'}
        `;

        try {
            const res = await fetch('/api/groq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userMessage: messageContent }),
            });
            const data = await res.json();
            setResponse(data.content);
        } catch (error) {
            console.error('Error fetching GROQ response:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen px-4 lg:px-10 bg-gray-900'>
            <div className='mt-10 max-w-full lg:max-w-3xl mx-auto'>
                <h1 className='text-3xl lg:text-5xl text-gray-200 text-center lg:text-left'>Let's generate your LinkedIn post</h1>
                <p className='mt-5 text-gray-200 text-center lg:text-left text-lg'>
                    Your results may vary. We are working on fine-tuning results to match your style.
                    Here are some tips to create better posts.
                </p>
                <div className='mt-5 text-gray-200 space-y-2 lg:space-y-4 text-center lg:text-left'>
                    <p className='text-lg lg:text-xl tracking-wider'>1. Clearly state what your post is about</p>
                    <p className='text-lg lg:text-xl tracking-wider'>2. Define your desired writing style and voice</p>
                    <p className='text-lg lg:text-xl tracking-wider'>3. Choose your topic, field, and whether to include hashtags</p>
                </div>

                <form onSubmit={handleSubmit} className='mt-10 space-y-6 lg:space-y-8'>
                    <div>
                        <h2 className='text-lg lg:text-xl text-gray-300'>Describe your post in a clear and detailed manner</h2>
                        <input
                            type="text"
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            className='mt-2 w-full p-3 text-gray-200 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500'
                            placeholder='E.g., Sharing my journey in software development...'
                            required
                        />
                    </div>

                    <div>
                        <h2 className='text-lg lg:text-xl text-gray-300'>How many posts do you want (1 credit per post)</h2>
                        <input
                            type="number"
                            value={postCount}
                            onChange={(e) => setPostCount(e.target.value)}
                            className='mt-2 w-full lg:w-1/4 p-3 text-gray-200 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500'
                            min="1"
                        />
                    </div>

                    <div>
                        <h2 className='text-lg lg:text-xl text-gray-300'>Select your desired writing style</h2>
                        <select
                            value={writingStyle}
                            onChange={(e) => setWritingStyle(e.target.value)}
                            className='mt-2 w-full p-3 bg-gray-800 text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-green-500'
                        >
                            <option value="professional">Professional</option>
                            <option value="informal">Informal</option>
                            <option value="motivational">Motivational</option>
                            <option value="technical">Technical</option>
                        </select>
                    </div>

                    <div>
                        <h2 className='text-lg lg:text-xl text-gray-300'>Select the type of voice</h2>
                        <select
                            value={voiceType}
                            onChange={(e) => setVoiceType(e.target.value)}
                            className='mt-2 w-full p-3 bg-gray-800 text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-green-500'
                        >
                            <option value="authoritative">Authoritative</option>
                            <option value="friendly">Friendly</option>
                            <option value="conversational">Conversational</option>
                            <option value="humorous">Humorous</option>
                        </select>
                    </div>

                    <div>
                        <h2 className='text-lg lg:text-xl text-gray-300'>Select the topic of your post</h2>
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className='mt-2 w-full p-3 text-gray-200 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-green-500'
                            placeholder='E.g., AI advancements, personal growth...'
                            required
                        />
                    </div>

                    <div>
                        <h2 className='text-lg lg:text-xl text-gray-300'>Select the field</h2>
                        <select
                            value={field}
                            onChange={(e) => setField(e.target.value)}
                            className='mt-2 w-full p-3 bg-gray-800 text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-green-500'
                        >
                            <option value="tech">Tech</option>
                            <option value="health">Health</option>
                            <option value="finance">Finance</option>
                            <option value="education">Education</option>
                            <option value="marketing">Marketing</option>
                            <option value="tourism">Tourism</option>
                            <option value="nature">Nature</option>
                        </select>
                    </div>

                    <div>
                        <label className='flex items-center text-lg lg:text-xl text-gray-300'>
                            <input
                                type="checkbox"
                                checked={includeHashtags}
                                onChange={(e) => setIncludeHashtags(e.target.checked)}
                                className='mr-2 rounded focus:outline-none text-gray-200 bg-gray-800 focus:ring-2 focus:ring-green-500'
                            />
                            Include hashtags in the post
                        </label>
                    </div>

                    <button type="submit" className='mt-5 w-full py-3 bg-green-500 text-white text-lg lg:text-xl rounded hover:bg-green-600 transition'>
                        Generate Post
                    </button>
                </form>

                <div className='mt-10'>
                    {loading ? (
                        <div className='flex justify-center items-center'>
                            <p className='text-gray-200 text-lg'>Loading...</p>
                        </div>
                    ) : (
                        <div className='p-4 bg-gray-800 rounded-lg shadow-lg'>
                            <h2 className='text-xl text-gray-300 mb-2'>Generated Post:</h2>
                            <ReactMarkdown className='text-gray-200'>{response || "No content generated."}</ReactMarkdown>
                        </div>
                    )}
                </div>
            </div >
        </div >
    );
}

export default Generate;