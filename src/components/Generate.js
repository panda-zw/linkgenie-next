"use client";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import ReactMarkdown from 'react-markdown';
import Image from "next/image";
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
            Generate a highly engaging and viral LinkedIn post using this structure:

            1. Hook: Start with a powerful, attention-grabbing statement or question related to: ${topic}
            2. Intrigue: Follow up with a surprising fact or bold claim that challenges conventional wisdom
            3. Personal angle: Share a brief, relatable personal story or insight
            4. Value: Provide actionable advice or a unique perspective that adds immediate value to the reader
            5. Engagement: End with a thought-provoking question or call-to-action that encourages comments and shares

            Key principles for viral content:
            • Be controversial (but not offensive)
            • Use simple language and short sentences
            • Create "aha" moments that make people want to share
            • Tap into current trends or timely issues
            • Use power words that evoke emotion
            • Break up text with emojis and line breaks for easy scanning
            • Start each line with a capital letter for better readability

            Additional details:
            Topic: ${topic}
            Writing Style: ${writingStyle}
            Voice Type: ${voiceType}
            Field: ${field}
            Post Length: ${postLength}
            Post Format: ${postFormat}
            Include Hashtags: ${includeHashtags ? 'Yes (use 3-5 relevant, trending hashtags)' : 'No'}
            Emotional Tone: ${emotionalTone}

            Incorporate these elements for maximum engagement:
            • Use numbers or statistics to add credibility
            • Include a counterintuitive insight or "pattern interrupt"
            • Add a touch of humor or wit where appropriate
            • Create a sense of urgency or FOMO (fear of missing out)
            • Use the "Before vs. After" or "Problem vs. Solution" framework
            • Leverage the power of storytelling to make your point memorable
            • No emojis

            Remember: The goal is to stop the scroll, spark curiosity, and compel action. Every word should serve a purpose in achieving virality and engagement.

            Important: Do not use asterisks (**) for emphasis. Instead, use ALL CAPS sparingly for key points or use 👉 emoji to draw attention to important ideas.
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
        <div className='min-h-screen px-2 lg:px-4 bg-gray-100 py-20'>
            <div className='py-10'>
                <div className="py-2 px-2 font-mulish">
                    <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-gray-800 bg-gray-100 shadow-sm">
                        <span className="inline-block pb-2 border-b-4 border-blue-500">
                            Let&apos;s generate your LinkedIn post.
                        </span>
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className='border mt-2 shadow-lg mx-2 px-3 py-2 rounded-lg bg-white'>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 py-2 px-3">
                        <div className="md:col-span-3 lg:col-span-4">
                            <label htmlFor="userInput" className="block mb-1 text-sm font-medium">Describe your post</label>
                            <textarea
                                id="userInput"
                                value={userMessage}
                                onChange={(e) => setUserMessage(e.target.value)}
                                className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                                placeholder="Describe the post you want to generate"
                                rows="3"
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="writingStyle" className="block mb-1 text-sm font-medium">Writing Style</label>
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
                            <label htmlFor="voiceType" className="block mb-1 text-sm font-medium">Voice Type</label>
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
                            <label htmlFor="postFormat" className="block mb-1 text-sm font-medium">Post Format</label>
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
                            <label htmlFor="topic" className="block mb-1 text-sm font-medium">Topic</label>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2"
                                placeholder="Enter the topic"
                            />
                        </div>
                        <div>
                            <label htmlFor="field" className="block mb-1 text-sm font-medium">Field</label>
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
                            <label htmlFor="includeHashtags" className="block mb-1 text-sm font-medium">Include Hashtags</label>
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
                            <label htmlFor="postLength" className="block mb-1 text-sm font-medium">Post Length</label>
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
                            <label htmlFor="hookType" className="block mb-1 text-sm font-medium">Hook Type</label>
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
                            <label htmlFor="includeStatistics" className="block mb-1 text-sm font-medium">Include Statistics</label>
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
                            <label htmlFor="callToAction" className="block mb-1 text-sm font-medium">Call to Action</label>
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
                            <label htmlFor="emotionalTone" className="block mb-1 text-sm font-medium">Emotional Tone</label>
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

                {loading && (
                    <div className="flex items-center justify-center space-x-2 mt-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse delay-75"></div>
                        <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse delay-150"></div>
                        <span className="text-green-500 font-medium">Generating post...</span>
                    </div>
                )}

                <div ref={postRef} className="py-2">
                    {!response && (
                        <div className="mt-2 mb-4 p-4 bg-white shadow-lg rounded-lg mx-2">
                            <h2 className="text-base font-mulish font-semibold">
                                Your post generation here
                            </h2>
                            <p className="text-sm text-gray-700 py-1">
                                no content generated yet
                            </p>
                        </div>
                    )}

                    {response && (
                        <div className="mt-2 mb-4 p-3 bg-white shadow-lg rounded-lg mx-2">
                            <h2 className="text-base font-semibold">Generated Post:</h2>
                            <ReactMarkdown className="text-sm text-gray-700">{response}</ReactMarkdown>
                            <button onClick={handleCopy}>
                                <div className="flex items-center space-x-2 mt-2 cursor-pointer bg-gray-100 hover:bg-gray-200 p-1 px-2 rounded-lg transition ease-in-out duration-300">
                                    <Image src="/icons/copy.png" alt="Copy" width={24} height={24} className='hover:scale-150 transition ease-in-out duration-300' />
                                    <p className="text-sm text-gray-700">Copy to Clipboard</p>
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Generate;