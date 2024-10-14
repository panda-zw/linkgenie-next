"use client"
import React, { useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import ReactMarkdown from 'react-markdown';
import Image from "next/image";

function Improve() {
    const [originalPost, setOriginalPost] = useState('');
    const [improvedPost, setImprovedPost] = useState('');
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    const handleImprove = async () => {
        setLoading(true);

        if (!originalPost) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please paste a post to improve.',
            });
            setLoading(false);
            return;
        }

        const messageContent = `
            Improve the following LinkedIn post to make it more engaging and viral:

            "${originalPost}"

            Ensure the post meets these criteria:
            1. The hook (first line) must be engaging.
            2. The hook must be educational, entertaining, or scroll-stopping.
            3. The rehook (second line) must increase reader interest. It's separated by an empty line and no longer than 8 words.
            4. The post must use a "how-to", "how I", or typical viral post format for engagement.
            5. The post must be written at a grade 3 or lower reading level.
            6. The post must be formatted for easy reading with no paragraphs and plenty of space. The hook is one sentence, maximum 8 words.
            7. The post must include a list.
            8. The post must end with a call-to-action question.
            9. The post must convey strong emotion.
            10. The post must include strong wording.

            Key principles for viral content:
            • Be controversial (but not offensive)
            • Use simple language and short sentences
            • Create "aha" moments that make people want to share
            • Tap into current trends or timely issues
            • Use power words that evoke emotion
            • Break up text with line breaks for easy scanning
            • Start each line with a capital letter for better readability

            Incorporate these elements for maximum engagement:
            • Use numbers or statistics to add credibility
            • Include a counterintuitive insight or "pattern interrupt"
            • Add a touch of humor or wit where appropriate
            • Create a sense of urgency or FOMO (fear of missing out)
            • Use the "Before vs. After" or "Problem vs. Solution" framework
            • Leverage the power of storytelling to make your point memorable
            • Do not use emojis

            Important: Do not use asterisks (**) for emphasis. Instead, use ALL CAPS sparingly for key points or use 👉 emoji to draw attention to important ideas.
        `;

        try {
            const res = await fetch('/api/groq', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userMessage: messageContent, model: 'llama-3.1-70b-versatile' }),
            });

            if (!res.ok) throw new Error('Failed to improve post.');

            const data = await res.json();
            setImprovedPost(data.content);

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Post improved successfully!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        } catch (error) {
            console.error('Error improving post:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to improve post.',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(improvedPost || 'No content generated.')
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Copied!',
                    text: 'Improved post copied to clipboard',
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
                    <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-gray-800 bg-gray-100">
                        <span className="inline-block pb-2 border-b-4 border-blue-500">
                            Improve your LinkedIn post
                        </span>
                    </h1>
                </div>

                <div className='border mt-2 shadow-lg mx-2 px-3 py-2 rounded-lg bg-white'>
                    <textarea
                        value={originalPost}
                        onChange={(e) => setOriginalPost(e.target.value)}
                        className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 mb-4"
                        placeholder="Paste your original LinkedIn post here..."
                        rows="5"
                    ></textarea>
                    <button
                        onClick={handleImprove}
                        className="flex items-center rounded-md border border-slate-300 py-2 px-4 mb-2 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-green-500 hover:border-green-500 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        disabled={loading}
                    >
                        {loading ? 'Improving...' : 'Improve Post'}
                    </button>
                </div>

                {loading && (
                    <div className="flex items-center justify-center space-x-2 mt-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse delay-75"></div>
                        <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse delay-150"></div>
                        <span className="text-green-500 font-medium">Improving post...</span>
                    </div>
                )}

                <div className="mt-2 mb-4 p-3 bg-white shadow-lg rounded-lg mx-2">
                    <h2 className="text-base font-semibold">Improved Post:</h2>
                    {improvedPost ? (
                        <ReactMarkdown className="text-sm text-gray-700">{improvedPost}</ReactMarkdown>
                    ) : (
                        <p className="text-sm text-gray-500 italic">Your improved post will appear here after generation.</p>
                    )}
                    <button onClick={handleCopy} disabled={!improvedPost}>
                        <div className={`flex items-center space-x-2 mt-2 cursor-pointer ${improvedPost ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-50 cursor-not-allowed'} p-1 px-2 rounded-lg transition ease-in-out duration-300`}>
                            <Image src="/icons/copy.png" alt="Copy" width={24} height={24} className={`${improvedPost ? 'hover:scale-150' : ''} transition ease-in-out duration-300`} />
                            <p className="text-sm text-gray-700">Copy to Clipboard</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Improve;
