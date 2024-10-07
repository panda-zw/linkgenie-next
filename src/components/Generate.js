"use client";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import ReactMarkdown from 'react-markdown';

const Generate = () => {
    const [model, setModel] = useState('llama-3.1-70b-versatile');
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
    const [hookType, setHookType] = useState('question');
    const [includeStatistics, setIncludeStatistics] = useState(true);
    const [callToAction, setCallToAction] = useState('ask_question');
    const [emotionalTone, setEmotionalTone] = useState('inspiring');
    const { data: session, update } = useSession();
    const router = useRouter();

    // Ref to scroll to the generated post
    const postRef = useRef(null);

    useEffect(() => {
        if (!session) return;
        const fetchCredits = async () => {
            try {
                const res = await fetch(`/api/user/${session.user.email}/`);
                if (!res.ok) throw new Error('Network response was not ok');
                const data = await res.json();
                setCredits(data.credits);
            } catch (error) {
                console.error('Failed to fetch credits:', error);
            }
        };
        fetchCredits();
    }, [session]);

    // Scroll to the generated post when response updates
    useEffect(() => {
        if (response && postRef.current) {
            postRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [response]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (credits < 1) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Not enough credits to generate posts.',
            });
            setLoading(false);
            return;
        }

        if (!userMessage || !topic || !field) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all required fields.',
            });
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
        Hook Type: ${hookType}
        Include Statistics: ${includeStatistics ? 'Yes' : 'No'}
        Call to Action: ${callToAction}
        Emotional Tone: ${emotionalTone}
        LinkedIn Post: Yes
        Start with a powerful hook based on the selected hook type.
        Include relevant statistics or data points if applicable.
        Use short paragraphs and line breaks for readability.
        End with a strong call to action based on the selected type.
        Optimize for maximum engagement and virality.
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
                body: JSON.stringify({ post: data.content, id: session.user.email, email: session.user.email }),
            });

            if (!postRes.ok) throw new Error('Failed to save post.');

            const creditRes = await fetch(`/api/deduct-credits/${session.user.email}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ postCount }),
            });

            const creditData = await creditRes.json();
            if (creditRes.ok) {
                setCredits(creditData.credits);
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: `Post generated! ${postCount} credit(s) deducted.`,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
                update();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: creditData.message || "Error deducting credits.",
                });
                if (creditData.message === "Unauthorized") router.push("/auth/signin");
            }
        } catch (error) {
            console.error('Error generating post or deducting credits:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to generate post.',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(response || 'No content generated.')
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Copied!',
                    text: 'Post copied to clipboard',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            })
            .catch(err => {
                console.error('Failed to copy post:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to copy post.',
                });
            });
    };

    return (
        <div className='min-h-screen px-2 lg:px-4 bg-gray-100'>
            <div className="py-4 px-2 font-mulish">
                <h1 className="text-lg font-semibold">Let's generate your LinkedIn post.</h1>
                <p className="text-sm">Your results may vary. We are working on fine-tuning results to match your style. Here are some tips to create better posts.</p>
            </div>

            <form onSubmit={handleSubmit} className='border shadow-lg mx-2 px-3 py-2 rounded-lg bg-white'>
                <h1 className="text-lg text-gray-600 mt-2">Generate Viral LinkedIn Post</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-3">
                    <div>
                        <label htmlFor="userInput" className="block mb-2">Describe your post</label>
                        <input
                            type="text"
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2"
                            placeholder="Describe the post you want to generate"
                        />
                    </div>
                    <div>
                        <label htmlFor="writingStyle" className="block mb-2">Writing Style</label>
                        <select
                            value={writingStyle}
                            onChange={(e) => setWritingStyle(e.target.value)}
                            className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2"
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
                            className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2"
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
                            className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2"
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
                            className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2"
                            placeholder="Enter the topic"
                        />
                    </div>
                    <div>
                        <label htmlFor="field" className="block mb-2">Field</label>
                        <select
                            value={field}
                            onChange={(e) => setField(e.target.value)}
                            className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2"
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
                            className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2"
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
                            className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2"
                        >
                            <option value="short">Short</option>
                            <option value="medium">Medium</option>
                            <option value="long">Long</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="hookType" className="block mb-2">Hook Type</label>
                        <select
                            value={hookType}
                            onChange={(e) => setHookType(e.target.value)}
                            className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2"
                        >
                            <option value="question">Question</option>
                            <option value="statistic">Surprising Statistic</option>
                            <option value="story">Personal Story</option>
                            <option value="controversial">Controversial Statement</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="includeStatistics" className="block mb-2">Include Statistics</label>
                        <select
                            value={includeStatistics ? 'yes' : 'no'}
                            onChange={(e) => setIncludeStatistics(e.target.value === 'yes')}
                            className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2"
                        >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="callToAction" className="block mb-2">Call to Action</label>
                        <select
                            value={callToAction}
                            onChange={(e) => setCallToAction(e.target.value)}
                            className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2"
                        >
                            <option value="ask_question">Ask a Question</option>
                            <option value="share_experience">Share Experience</option>
                            <option value="request_opinion">Request Opinion</option>
                            <option value="challenge_audience">Challenge Audience</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="emotionalTone" className="block mb-2">Emotional Tone</label>
                        <select
                            value={emotionalTone}
                            onChange={(e) => setEmotionalTone(e.target.value)}
                            className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2"
                        >
                            <option value="inspiring">Inspiring</option>
                            <option value="thought_provoking">Thought-provoking</option>
                            <option value="surprising">Surprising</option>
                            <option value="empowering">Empowering</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end mt-3">
                    <button
                        type="submit"
                        className="px-4 text-sm text-white bg-green-600 hover:bg-green-700 rounded-lg py-1.5"
                        disabled={loading}
                    >
                        {loading ? 'Generating...' : 'Generate'}
                    </button>
                </div>
            </form>

            {loading && (
                <div className="flex items-center justify-center space-x-2 mt-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse delay-75"></div>
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse delay-150"></div>
                    <span className="text-green-500 font-medium">Generating post...</span>
                </div>
            )}

            <div ref={postRef} className="py-3">
                {!response && (
                    <div className="mt-3 mb-8 p-3 bg-white shadow-lg rounded-lg mx-2">
                        <h2 className="text-base font-mulish font-semibold">
                            Your post generation here
                        </h2>
                        <p className="text-sm text-gray-700 py-1">
                            no content generated yet
                        </p>
                    </div>
                )}

                {response && (
                    <div className="mt-3 mb-8 p-3 bg-white shadow-lg rounded-lg mx-2">
                        <h2 className="text-base font-semibold">Generated Post:</h2>
                        <ReactMarkdown className="text-sm text-gray-700">{response}</ReactMarkdown>
                        <button onClick={handleCopy} className="px-4 mt-2 text-sm text-white bg-green-600 hover:bg-green-700 rounded-lg py-1.5">
                            Copy to Clipboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Generate;