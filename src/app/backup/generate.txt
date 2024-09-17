"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ReactMarkdown from 'react-markdown';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const [postLength, setPostLength] = useState('medium');
    const [postFormat, setPostFormat] = useState('paragraph');
    const [credits, setCredits] = useState(0);
    const { data: session, update } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            const fetchCredits = async () => {
                try {
                    const res = await fetch(`/api/user/${session.user.id}/`);
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await res.json();
                    setCredits(data.credits);
                } catch (error) {
                    console.error('Failed to fetch credits:', error);
                }
            };
            fetchCredits();
        }
    }, [session]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (credits < postCount) {
            toast.error("Not enough credits to generate posts.");
            setLoading(false);
            return;
        }

        const messageContent = `
        ${userMessage}
        Writing Style: ${writingStyle}
        Voice Type: ${voiceType}
        Topic: ${topic}
        Field: ${field}
        Post Length: ${postLength}
        Post Format: ${postFormat}
        Include Hashtags: ${includeHashtags ? 'Yes' : 'No'}
        LinkedIn Post: Yes
        Start with a bold promise.
        List format with 7-9 items.
        Keep each item short and punchy.
        End the post with a question.
    `;

        try {

            const res = await fetch('/api/groq', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ userMessage: messageContent }),
            });

            const data = await res.json();
            setResponse(data.content);
            const postRes = await fetch(`/api/posts`, {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ post: data.content, id: session.user.id }),
            });
            const creditRes = await fetch(`/api/deduct-credits/${session.user.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ postCount }),
            });
            const creditData = await creditRes.json();
            if (creditRes.ok) {
                setCredits(creditData.credits);
                toast.success(`Post generated! ${postCount} credit(s) deducted.`);
                await update();
            } else {
                toast.error(creditData.message || "Error deducting credits.");
                if (creditData.message === "Unauthorized") {
                    router.push("/auth/signin");
                }
            }
        } catch (error) {
            console.error('Error generating post or deducting credits:', error);
            toast.error("Failed to generate post.");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(response || 'No content generated.')
            .then(() => toast.success('Post copied to clipboard!'))
            .catch(err => console.error('Failed to copy post:', err));
    };

    return (
        <div className='min-h-screen px-4 lg:px-10 bg-gray-900'>
            <div className='mt-10 max-w-full lg:max-w-3xl mx-auto'>
                <h1 className='text-3xl lg:text-5xl text-gray-200 text-center lg:text-left'>Let&apos;s generate your LinkedIn post</h1>
                <p className='mt-5 text-gray-200 text-center lg:text-left text-lg'>
                    Your results may vary. We are working on fine-tuning results to match your style.
                    Here are some tips to create better posts.
                </p>

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
                        <h2 className='text-lg lg:text-xl text-gray-300'>Writing Style</h2>
                        <select
                            value={writingStyle}
                            onChange={(e) => setWritingStyle(e.target.value)}
                            className='mt-2 w-full p-3 text-gray-200 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500'
                        >
                            <option value="professional">Professional</option>
                            <option value="informal">Informal</option>
                            <option value="persuasive">Persuasive</option>
                            <option value="disruptive">Disruptive</option>
                            <option value="professional">Professional</option>
                            <option value="casual">Casual</option>
                            <option value="storytelling">Storytelling</option>
                        </select>
                    </div>

                    <div>
                        <h2 className='text-lg lg:text-xl text-gray-300'>Voice Type</h2>
                        <select
                            value={voiceType}
                            onChange={(e) => setVoiceType(e.target.value)}
                            className='mt-2 w-full p-3 text-gray-200 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500'
                        >
                            <option value="authoritative">Authoritative</option>
                            <option value="friendly">Friendly</option>
                            <option value="enthusiastic">Enthusiastic</option>
                            <option value="neutral">Neutral</option>
                            <option value="inspirational">Inspirational</option>

                        </select>
                    </div>

                    <div>
                        <h2 className='text-lg lg:text-xl text-gray-300'>Topic</h2>
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className='mt-2 w-full p-3 text-gray-200 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500'
                            placeholder='E.g., AI advancements in healthcare...'
                        />
                    </div>

                    <div>
                        <h2 className='text-lg lg:text-xl text-gray-300'>Field</h2>
                        <select
                            value={field}
                            onChange={(e) => setField(e.target.value)}
                            className='mt-2 w-full p-3 text-gray-200 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500'
                        >
                            <option value="tech">Tech</option>
                            <option value="health">Health</option>
                            <option value="finance">Finance</option>
                            <option value="education">Education</option>
                            <option value="business">Business</option>
                            <option value="marketing">Marketing</option>
                            <option value="science">Science</option>
                            <option value="art">Art</option>
                            <option value="sports">Sports</option>
                            <option value="travel">Travel</option>
                            <option value="lifestyle">Lifestyle</option>
                        </select>
                    </div>

                    <div>
                        <h2 className='text-lg lg:text-xl text-gray-300'>Post Length</h2>
                        <select
                            value={postLength}
                            onChange={(e) => setPostLength(e.target.value)}
                            className='mt-2 w-full p-3 text-gray-200 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500'
                        >
                            <option value="short">Short</option>
                            <option value="medium">Medium</option>
                            <option value="long">Long</option>
                        </select>
                    </div>

                    <div>
                        <h2 className='text-lg lg:text-xl text-gray-300'>Post Format</h2>
                        <select
                            value={postFormat}
                            onChange={(e) => setPostFormat(e.target.value)}
                            className='mt-2 w-full p-3 text-gray-200 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500'
                        >
                            <option value="paragraph">Paragraph</option>
                            <option value="point">Point</option>
                            <option value="number">Number</option>
                        </select>
                    </div>

                    <div className='flex items-center'>
                        <input
                            type="checkbox"
                            checked={includeHashtags}
                            onChange={() => setIncludeHashtags(!includeHashtags)}
                            className='h-5 w-5 text-green-500 bg-gray-800 rounded'
                        />
                        <label className='ml-3 text-lg text-gray-300'>Include Hashtags</label>
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
                            <button
                                onClick={handleCopy}
                                className='mt-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700 transition'
                            >
                                Copy Post
                            </button>
                        </div>
                    )}
                </div>

                <div className='mt-4 text-gray-300'>
                    <p><strong>Credits left:</strong> {credits}</p>
                </div>
            </div>
        </div>
    );
}

export default Generate;