"use client"
import React, { useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import ReactMarkdown from 'react-markdown';
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Loader2, Copy } from "lucide-react";

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
            2. The hook must be educational, entertaining, or scroll-stopping .
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
            • Start with "How I" and end with a "how you" moment. This builds sooo much authority!
            • Always use singular noun forms


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
        <div className="min-h-screen px-4 py-8 bg-background">
            <div className="max-w-8xl mx-auto px-5">
                <h1 className="text-2xl font-extrabold mb-8 mt-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Improve your LinkedIn post
                </h1>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Original Post</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <Label htmlFor="originalPost" className="text-sm">Paste your original LinkedIn post</Label>
                            <Textarea
                                id="originalPost"
                                value={originalPost}
                                onChange={(e) => setOriginalPost(e.target.value)}
                                placeholder="Paste your original LinkedIn post here..."
                                className="mt-1 h-40"
                            />
                        </div>
                        <Button onClick={handleImprove} disabled={loading}>
                            {loading ?
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Improving...
                                </> :
                                "Improve Post"}
                        </Button>
                    </CardContent>
                </Card>

                {loading && (
                    <div className="flex items-center justify-center space-x-2 mt-4">
                        <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                        <div className="w-4 h-4 bg-primary rounded-full animate-pulse delay-75"></div>
                        <div className="w-4 h-4 bg-primary rounded-full animate-pulse delay-150"></div>
                        <span className="text-primary font-medium">Improving post...</span>
                    </div>
                )}

                {improvedPost && (
                    <Card className="mt-6">
                        <CardHeader className="pb-2">
                            <CardTitle>Improved Post</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ReactMarkdown className="prose dark:prose-invert text-sm">{improvedPost}</ReactMarkdown>
                            <Button onClick={handleCopy} className="mt-4">
                                <Copy className="mr-2 h-4 w-4" />
                                Copy to Clipboard
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}

export default Improve;
