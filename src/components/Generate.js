"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactMarkdown from 'react-markdown';

const Generate = () => {
    const [model, setModel] = useState('llama-3.1-8b-instant');
    const [userMessage, setUserMessage] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [postCount, setPostCount] = useState(1);
    const [writingStyle, setWritingStyle] = useState('professional');
    const [voiceType, setVoiceType] = useState('authoritative');
    const [postFormat, setPostFormat] = useState('paragraph');
    const [topic, setTopic] = useState('');
    const [field, setField] = useState('Tech');
    const [includeHashtags, setIncludeHashtags] = useState(false);
    const [postLength, setPostLength] = useState('medium');
    const [credits, setCredits] = useState(0);
    const { data: session, update } = useSession();
    const router = useRouter();


    useEffect(() => {
        if (!session) return;
        const fetchCredits = async () => {
            try {
                const res = await fetch(`/api/user/${session.user.id}/`);
                if (!res.ok) throw new Error('Network response was not ok');
                const data = await res.json();
                setCredits(data.credits);
            } catch (error) {
                console.error('Failed to fetch credits:', error);
            }
        };
        fetchCredits();
    }, [session]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (credits < 1) {
            toast.error("Not enough credits to generate posts.");
            setLoading(false);
            return;
        }

        if (!userMessage || !topic || !field) {
            toast.error("Please fill in all required fields.");
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userMessage: messageContent, model }),
            });

            if (!res.ok) throw new Error('Failed to generate post.');

            const data = await res.json();
            setResponse(data.content);

            const postRes = await fetch(`/api/posts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ post: data.content, id: session.user.id }),
            });

            if (!postRes.ok) throw new Error('Failed to save post.');

            const creditRes = await fetch(`/api/deduct-credits/${session.user.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ postCount }),
            });

            const creditData = await creditRes.json();
            if (creditRes.ok) {
                setCredits(creditData.credits);
                toast.success(`Post generated! ${postCount} credit(s) deducted.`);
                update();
            } else {
                toast.error(creditData.message || "Error deducting credits.");
                if (creditData.message === "Unauthorized") router.push("/auth/signin");
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
        <div className='min-h-screen px-4 lg:px-10 bg-gray-100'>
            <div className="py-10 px-3 font-mulish">
                <h1 className=" text-xl font-semibold">Let’s generate your LinkedIn post.</h1>
                <p>Your results may vary. We are working on fine-tuning results to match your style. Here are some tips to create better posts.</p>
            </div>

            <form onSubmit={handleSubmit} className='border shadow-lg mx-3.5 px-5 py-2 rounded-lg bg-white'>
                <h1 className="text-xl text-gray-600 mt-5">Generate Post</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-5">
                    <div>
                        <label htmlFor="userInput" className="block mb-2">Describe your post</label>
                        <input
                            type="text"
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 block w-full p-2.5"
                            placeholder="Describe the post you want to generate"
                        />
                    </div>
                    <div>
                        <label htmlFor="writingStyle" className="block mb-2">Writing Style</label>
                        <select
                            value={writingStyle}
                            onChange={(e) => setWritingStyle(e.target.value)}
                            className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 block w-full p-2.5"
                        >
                            <option value="professional">Professional</option>
                            <option value="casual">Casual</option>
                            <option value="persuasive">Persuasive</option>
                            <option value="informative">Informative</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="voiceType" className="block mb-2">Voice Type</label>
                        <select
                            value={voiceType}
                            onChange={(e) => setVoiceType(e.target.value)}
                            className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 block w-full p-2.5"
                        >
                            <option value="authoritative">Authoritative</option>
                            <option value="friendly">Friendly</option>
                            <option value="inspirational">Inspirational</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="postFormat" className="block mb-2">Post Format</label>
                        <select
                            value={postFormat}
                            onChange={(e) => setPostFormat(e.target.value)}
                            className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 block w-full p-2.5"
                        >
                            <option value="paragraph">Paragraph</option>
                            <option value="list">List</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="topic" className="block mb-2">Topic</label>
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 block w-full p-2.5"
                            placeholder="Enter the topic"
                        />
                    </div>
                    <div>
                        <label htmlFor="field" className="block mb-2">Field</label>
                        <select
                            value={field}
                            onChange={(e) => setField(e.target.value)}
                            className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 block w-full p-2.5"
                        >
                            <option value="Tech">Tech</option>
                            <option value="Health">Health</option>
                            <option value="Finance">Finance</option>
                            <option value="Education">Education</option>
                            <option value="Business">Business</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="includeHashtags" className="block mb-2">Include Hashtags</label>
                        <select
                            value={includeHashtags ? 'yes' : 'no'}
                            onChange={(e) => setIncludeHashtags(e.target.value === 'yes')}
                            className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 block w-full p-2.5"
                        >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="postLength" className="block mb-2">Post Length</label>
                        <select
                            value={postLength}
                            onChange={(e) => setPostLength(e.target.value)}
                            className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-blue-500 block w-full p-2.5"
                        >
                            <option value="short">Short</option>
                            <option value="medium">Medium</option>
                            <option value="long">Long</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end mt-5">
                    <button
                        type="submit"
                        className="px-5 text-white bg-green-600 hover:bg-green-700 rounded-lg py-2"
                        disabled={loading}
                    >
                        {loading ? 'Generating...' : 'Generate Post'}
                    </button>
                </div>

            </form>

            {response && (
                <div className="py-5">
                    <div className="mt-5 mb-16 p-5 bg-white shadow-lg rounded-lg mx-3.5">
                        <h2 className="text-lg font-semibold">Generated Post:</h2>
                        <ReactMarkdown className="text-gray-700">{response}</ReactMarkdown>
                        <button onClick={handleCopy} className="px-5 mt-2 text-white bg-green-600 hover:bg-green-700 rounded-lg py-2">Copy to Clipboard</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Generate;
