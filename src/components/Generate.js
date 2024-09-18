"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ReactMarkdown from 'react-markdown';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SelectField = ({ label, value, options, onChange }) => (
    <div>
        <h2 className='text-lg lg:text-xl text-gray-300'>{label}</h2>
        <select
            value={value}
            onChange={onChange}
            className='mt-2 w-full p-3 text-gray-200 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500'
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
);

const TextInput = ({ label, value, onChange, placeholder }) => (
    <div>
        <h2 className='text-lg lg:text-xl text-gray-300'>{label}</h2>
        <input
            type="text"
            value={value}
            onChange={onChange}
            className='mt-2 w-full p-3 text-gray-200 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500'
            placeholder={placeholder}
        />
    </div>
);

const Checkbox = ({ label, checked, onChange }) => (
    <div>
        <h2 className='text-lg lg:text-xl text-gray-300'>{label}</h2>
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className='mt-2'
        />
    </div>
);

function Generate() {
    const [model, setModel] = useState('llama-3.1-8b-instant');
    const [userMessage, setUserMessage] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [postCount, setPostCount] = useState(1);
    const [writingStyle, setWritingStyle] = useState('professional');
    const [customWritingStyle, setCustomWritingStyle] = useState('');
    const [voiceType, setVoiceType] = useState('authoritative');
    const [customVoiceType, setCustomVoiceType] = useState('');
    const [postFormat, setPostFormat] = useState('paragraph');
    const [customPostFormat, setCustomPostFormat] = useState('');
    const [topic, setTopic] = useState('');
    const [field, setField] = useState('tech');
    const [customField, setCustomField] = useState('');
    const [fields, setFields] = useState(['Tech', 'Health', 'Finance', 'Education', 'Business']);
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

    const handleFieldChange = (e) => {
        const selectedValue = e.target.value;
        setField(selectedValue);
        if (selectedValue !== 'other') setCustomField('');
    };

    const handleAddCustomField = () => {
        if (customField && !fields.includes(customField)) {
            setFields([...fields, customField]);
            setField(customField);
        }
    };

    const handleWritingStyleChange = (e) => {
        const selectedValue = e.target.value;
        setWritingStyle(selectedValue);
        if (selectedValue !== 'other') setCustomWritingStyle('');
    };

    const handleAddCustomWritingStyle = () => {
        if (customWritingStyle) {
            setWritingStyle(customWritingStyle);
        }
    };

    const handleVoiceTypeChange = (e) => {
        const selectedValue = e.target.value;
        setVoiceType(selectedValue);
        if (selectedValue !== 'other') setCustomVoiceType('');
    };

    const handleAddCustomVoiceType = () => {
        if (customVoiceType) {
            setVoiceType(customVoiceType);
        }
    };

    const handlePostFormatChange = (e) => {
        const selectedValue = e.target.value;
        setPostFormat(selectedValue);
        if (selectedValue !== 'other') setCustomPostFormat('');
    };

    const handleAddCustomPostFormat = () => {
        if (customPostFormat) {
            setPostFormat(customPostFormat);
        }
    };

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
        <div className='min-h-screen px-4 lg:px-10 bg-gray-900'>
            <div className='mt-10 max-w-full lg:max-w-3xl mx-auto'>
                <h1 className='text-3xl lg:text-5xl text-gray-200 text-center lg:text-left'>
                    Let&apos;s generate your LinkedIn post
                </h1>
                <p className='mt-5 text-gray-200 text-center lg:text-left text-lg'>
                    Your results may vary. We are working on fine-tuning results to match your style.
                    Here are some tips to create better posts.
                </p>

                <form onSubmit={handleSubmit} className='mt-10 space-y-6 lg:space-y-8'>
                    <TextInput
                        label="Describe your post in a clear and detailed manner"
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        placeholder='E.g., Sharing my journey in software development...'
                    />

                    <div>
                        <h2 className='text-lg lg:text-xl text-gray-300'>Writing Style</h2>
                        <SelectField
                            value={writingStyle}
                            options={[
                                { value: "professional", label: "Professional" },
                                { value: "informal", label: "Informal" },
                                { value: "persuasive", label: "Persuasive" },
                                { value: "inspirational", label: "Inspirational" },
                                { value: "other", label: "Other" }
                            ]}
                            onChange={handleWritingStyleChange}
                        />
                        {writingStyle === 'other' && (
                            <div className="mt-4">
                                <TextInput
                                    value={customWritingStyle}
                                    onChange={(e) => setCustomWritingStyle(e.target.value)}
                                    placeholder="Enter custom writing style"
                                />
                                <button
                                    onClick={handleAddCustomWritingStyle}
                                    className="mt-2 p-2 bg-green-500 text-white rounded"
                                >
                                    Set Custom Writing Style
                                </button>
                            </div>
                        )}
                    </div>

                    <div>
                        <h2 className='text-lg lg:text-xl text-gray-300'>Voice Type</h2>
                        <SelectField
                            value={voiceType}
                            options={[
                                { value: "authoritative", label: "Authoritative" },
                                { value: "friendly", label: "Friendly" },
                                { value: "enthusiastic", label: "Enthusiastic" },
                                { value: "neutral", label: "Neutral" },
                                { value: "inspirational", label: "Inspirational" },
                                { value: "other", label: "Other" }
                            ]}
                            onChange={handleVoiceTypeChange}
                        />
                        {voiceType === 'other' && (
                            <div className="mt-4">
                                <TextInput
                                    value={customVoiceType}
                                    onChange={(e) => setCustomVoiceType(e.target.value)}
                                    placeholder="Enter custom voice type"
                                />
                                <button
                                    onClick={handleAddCustomVoiceType}
                                    className="mt-2 p-2 bg-green-500 text-white rounded"
                                >
                                    Set Custom Voice Type
                                </button>
                            </div>
                        )}
                    </div>

                    <div>
                        <h2 className='text-lg lg:text-xl text-gray-300'>Post Format</h2>
                        <SelectField
                            value={postFormat}
                            options={[
                                { value: "paragraph", label: "Paragraph" },
                                { value: "list", label: "List" },
                                { value: "bullet", label: "Bullet Points" },
                                { value: "quote", label: "Quote" },
                                { value: "other", label: "Other" }
                            ]}
                            onChange={handlePostFormatChange}
                        />
                        {postFormat === 'other' && (
                            <div className="mt-4">
                                <TextInput
                                    value={customPostFormat}
                                    onChange={(e) => setCustomPostFormat(e.target.value)}
                                    placeholder="Enter custom post format"
                                />
                                <button
                                    onClick={handleAddCustomPostFormat}
                                    className="mt-2 p-2 bg-green-500 text-white rounded"
                                >
                                    Set Custom Post Format
                                </button>
                            </div>
                        )}
                    </div>

                    <TextInput
                        label="Topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder='E.g., AI advancements in healthcare...'
                    />

                    <div>
                        <h2 className='text-lg lg:text-xl text-gray-300'>Field</h2>
                        <SelectField
                            value={field}
                            options={[
                                ...fields.map(f => ({ value: f.toLowerCase(), label: f })),
                                { value: "other", label: "Other" }
                            ]}
                            onChange={handleFieldChange}
                        />
                        {field === 'other' && (
                            <div className="mt-4">
                                <TextInput
                                    value={customField}
                                    onChange={(e) => setCustomField(e.target.value)}
                                    placeholder="Enter custom field"
                                />
                                <button
                                    onClick={handleAddCustomField}
                                    className="mt-2 p-2 bg-green-500 text-white rounded"
                                >
                                    Add Custom Field
                                </button>
                            </div>
                        )}
                    </div>

                    <SelectField
                        label="Post Length"
                        value={postLength}
                        options={[
                            { value: "short", label: "Short" },
                            { value: "medium", label: "Medium" },
                            { value: "long", label: "Long" }
                        ]}
                        onChange={(e) => setPostLength(e.target.value)}
                    />

                    <SelectField
                        label="Select Model"
                        value={model}
                        options={[
                            { value: "gemma-7b-it", label: "Gemma 7B IT" },
                            { value: "gemma2-9b-it", label: "Gemma2 9B IT" },
                            { value: "mixtral-8x7b-32768", label: "Mixtral 8x7B" },
                            { value: "llama-3.1-8b-instant", label: "Llama 3.1 8B Instant" },
                            { value: "llama-3.1-70b-versatile", label: "Llama 3.1 70B Versatile" }
                        ]}
                        onChange={(e) => setModel(e.target.value)}
                    />

                    <Checkbox
                        label="Include Hashtags"
                        checked={includeHashtags}
                        onChange={(e) => setIncludeHashtags(e.target.checked)}
                    />

                    <div className='text-center lg:text-left'>
                        <button
                            type="submit"
                            disabled={loading}
                            className='mt-5 w-full py-3 bg-green-500 text-white text-lg lg:text-xl rounded hover:bg-green-600 transition'>
                            {loading ? 'Generating...' : 'Generate Post'}
                        </button>
                    </div>
                </form>

                <div className='mt-10'>
                    {response && (
                        <div className='bg-gray-800 p-5 rounded-lg'>
                            <h2 className='text-lg text-gray-300'>Generated Post</h2>
                            <ReactMarkdown className='mt-3 text-gray-200'>{response}</ReactMarkdown>
                            <button
                                onClick={handleCopy}
                                className='mt-5 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none'
                            >
                                Copy to Clipboard
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Generate;
