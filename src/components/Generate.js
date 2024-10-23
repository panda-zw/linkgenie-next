"use client";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import ReactMarkdown from 'react-markdown';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Copy } from "lucide-react";

const Generate = () => {
    const [model, setModel] = useState('llama-3.1-70b-versatile');
    const [userMessage, setUserMessage] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [postCount, setPostCount] = useState(1);
    const [writingStyle, setWritingStyle] = useState('professional');
    const [customWritingStyle, setCustomWritingStyle] = useState("");
    const [voiceType, setVoiceType] = useState('authoritative');
    const [customVoiceType, setCustomVoiceType] = useState("");
    const [postFormat, setPostFormat] = useState('paragraph');

    const [topic, setTopic] = useState('');
    const [field, setField] = useState('Tech');
    const [customField, setCustomField] = useState("");
    const [includeHashtags, setIncludeHashtags] = useState(false);
    const [postLength, setPostLength] = useState(150);
    const [credits, setCredits] = useState(0);
    const [hookType, setHookType] = useState('question');
    const [customHookType, setCustomHookType] = useState("");
    const [includeStatistics, setIncludeStatistics] = useState(true);
    const [callToAction, setCallToAction] = useState('ask_question');
    const [customCallToAction, setCustomCallToAction] = useState("");
    const [emotionalTone, setEmotionalTone] = useState('inspiring');
    const [customEmotionalTone, setCustomEmotionalTone] = useState("");
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

            1. Hook: ${getHookPrompt()}
            2. Intrigue: Follow up with a surprising fact or bold claim that challenges conventional wisdom supporting the hook (1 line)
            3. Personal angle: Share a brief, relatable personal story or insight
            4. Value: Provide actionable advice or a unique perspective that adds immediate value to the reader
            5. Engagement: End with a thought-provoking question or call-to-action that encourages comments and shares

            Key principles for viral content and engagement:
            • Be controversial (but not offensive)
            • Use simple language and short sentences
            • Create "aha" moments that make people want to share
            • Tap into current trends or timely issues
            • Use power words that evoke emotion
            • Break up text with line breaks for easy scanning (no emojis)
            • Start each line with a capital letter for better readability
            • Make sure people will be able to relate to the post
            • The post must solve a problem
            • Not more than 2 lines in a paragraph (maximum 12 words per paragraph)
            • Start with "How I" and end with a "how you" moment to build authority
            • Always use singular noun forms
            • Ensure each paragraph is concise and impactful, ideally no longer than 3 sentences.

            Remember: The goal is to stop the scroll, spark curiosity, and compel action. Every word should serve a purpose in achieving virality and engagement.

            Additional details:
            Topic: ${topic}
            Writing Style: ${writingStyle === "custom" ? customWritingStyle : writingStyle}
            Voice Type: ${voiceType === "custom" ? customVoiceType : voiceType}
            Field: ${field === "custom" ? customField : field}
            Post Length: ${postLength} words
            Post Format: ${postFormat}
            Include Hashtags: ${includeHashtags ? "Yes (use 3-5 relevant, trending hashtags)" : "No"}
            Emotional Tone: ${emotionalTone === "custom" ? customEmotionalTone : emotionalTone}
            Call to Action: ${getCallToActionPrompt()}

            Latest LinkedIn algorithm preferences:
            • Posts with high dwell time (time spent reading) perform better
            • Native content (text posts) often outperforms external links
            • Posts that encourage meaningful conversations and debates are favored
            • Use of relevant and trending hashtags can increase visibility
            • Posts that provide value and insights specific to your industry are prioritized
            • Consistency in posting schedule is rewarded by the algorithm
            • Posts that tag relevant people or companies (when appropriate) can expand reach
            • The first hour after posting is crucial for engagement and visibility
            • Posts with a clear and compelling call-to-action tend to perform better
            • LinkedIn favors "dwell time" over quick likes, so aim for content that makes people stop and read

            Generate the post now, adhering to these guidelines and the specified structure.
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

    const getHookPrompt = () => {
        const hooks = {
            question: "Craft an irresistible opening question that instantly grabs attention",
            statistic: "Start with a surprising statistic that challenges common assumptions",
            story: "Begin with a brief, intriguing personal anecdote that relates to the main point",
            controversial: "Open with a bold, slightly controversial statement to spark interest",
            storytelling: "Use a storytelling hook that immediately draws the reader in",
            emotional: "Start with an emotional appeal that resonates with your target audience",
            authority: "Begin with an authority-establishing statement that showcases your expertise",
            broad_appeal: "Open with a universally relatable statement or question",
            curiosity: "Craft a curiosity-inducing opening that leaves readers wanting more",
            numbers: "Start with a compelling number or statistic that grabs attention",
            custom: customHookType,
        };
        return hooks[hookType] || hooks.question;
    };

    const getCallToActionPrompt = () => {
        const ctas = {
            ask_question: "End with a thought-provoking question that encourages comments",
            share_experience: "Invite readers to share their own experiences or insights",
            request_opinion: "Ask for opinions on a specific aspect of the topic",
            challenge_audience: "Challenge the audience to take a specific action related to the post",
            custom: customCallToAction,
        };
        return ctas[callToAction] || ctas.ask_question;
    };

    const renderSelectWithCustomOption = (
        label,
        value,
        onChange,
        options,
        customValue,
        setCustomValue
    ) => (
        <div>
            <Label htmlFor={label}>{label}</Label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger>
                    <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                    <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
            </Select>
            {value === "custom" && (
                <Input
                    value={customValue}
                    onChange={(e) => setCustomValue(e.target.value)}
                    placeholder={`Enter custom ${label.toLowerCase()}`}
                    className="mt-2"
                />
            )}
        </div>
    );

    return (
        <div className="min-h-screen px-4 py-8 bg-background">
            <div className="max-w-8xl mx-auto px-5">
                <h1 className="text-2xl font-extrabold mb-8 mt-16 bg-gradient-to-r from-primary to-green-500 bg-clip-text text-transparent">
                    Generate Your Viral LinkedIn Post
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle>Post Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <Label htmlFor="userInput" className="text-sm">Describe your post</Label>
                                <Textarea
                                    id="userInput"
                                    value={userMessage}
                                    onChange={(e) => setUserMessage(e.target.value)}
                                    placeholder="Describe the post you want to generate"
                                    className="mt-1 h-20"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <Label htmlFor="topic" className="text-sm">Topic</Label>
                                    <Input
                                        id="topic"
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                        placeholder="Enter the topic"
                                        className="mt-1"
                                    />
                                </div>
                                {renderSelectWithCustomOption(
                                    "Field",
                                    field,
                                    setField,
                                    [
                                        { value: "Tech", label: "Tech" },
                                        { value: "Health", label: "Health" },
                                        { value: "Finance", label: "Finance" },
                                        { value: "Education", label: "Education" },
                                        { value: "Business", label: "Business" },
                                        { value: "Marketing", label: "Marketing" },
                                        { value: "Entrepreneurship", label: "Entrepreneurship" },
                                        { value: "Leadership", label: "Leadership" },
                                        { value: "Productivity", label: "Productivity" },
                                        { value: "Design", label: "Design" },
                                        { value: "Writing", label: "Writing" },
                                        { value: "Sales", label: "Sales" },
                                    ],
                                    customField,
                                    setCustomField
                                )}
                                {renderSelectWithCustomOption(
                                    "Writing Style",
                                    writingStyle,
                                    setWritingStyle,
                                    [
                                        { value: "professional", label: "Professional" },
                                        { value: "casual", label: "Casual" },
                                        { value: "persuasive", label: "Persuasive" },
                                        { value: "informative", label: "Informative" },
                                        { value: "humorous", label: "Humorous" },
                                        { value: "inspirational", label: "Inspirational" },
                                        { value: "thoughtful", label: "Thoughtful" },
                                        { value: "engaging", label: "Engaging" },
                                        { value: "challenging", label: "Challenging" },
                                    ],
                                    customWritingStyle,
                                    setCustomWritingStyle
                                )}
                                {renderSelectWithCustomOption(
                                    "Voice Type",
                                    voiceType,
                                    setVoiceType,
                                    [
                                        { value: "authoritative", label: "Authoritative" },
                                        { value: "friendly", label: "Friendly" },
                                        { value: "inspirational", label: "Inspirational" },
                                        { value: "thoughtful", label: "Thoughtful" },
                                        { value: "engaging", label: "Engaging" },
                                        { value: "challenging", label: "Challenging" },
                                    ],
                                    customVoiceType,
                                    setCustomVoiceType
                                )}
                                {renderSelectWithCustomOption(
                                    "Hook Type",
                                    hookType,
                                    setHookType,
                                    [
                                        { value: "question", label: "Question" },
                                        { value: "statistic", label: "Surprising Statistic" },
                                        { value: "story", label: "Personal Story" },
                                        { value: "controversial", label: "Controversial Statement" },
                                        { value: "storytelling", label: "Storytelling" },
                                        { value: "emotional", label: "Emotional" },
                                        { value: "authority", label: "Authority" },
                                        { value: "broad_appeal", label: "Broad Appeal" },
                                        { value: "curiosity", label: "Curiosity" },
                                        { value: "numbers", label: "Numbers" },
                                    ],
                                    customHookType,
                                    setCustomHookType
                                )}
                                {renderSelectWithCustomOption(
                                    "Call to Action",
                                    callToAction,
                                    setCallToAction,
                                    [
                                        { value: "ask_question", label: "Ask a Question" },
                                        { value: "share_experience", label: "Share Experience" },
                                        { value: "request_opinion", label: "Request Opinion" },
                                        { value: "challenge_audience", label: "Challenge Audience" },
                                    ],
                                    customCallToAction,
                                    setCustomCallToAction
                                )}
                                {renderSelectWithCustomOption(
                                    "Emotional Tone",
                                    emotionalTone,
                                    setEmotionalTone,
                                    [
                                        { value: "inspiring", label: "Inspiring" },
                                        { value: "thought_provoking", label: "Thought-provoking" },
                                        { value: "surprising", label: "Surprising" },
                                        { value: "empowering", label: "Empowering" },
                                    ],
                                    customEmotionalTone,
                                    setCustomEmotionalTone
                                )}
                                <div>
                                    <Label htmlFor="postFormat" className="text-sm">Post Format</Label>
                                    <Select value={postFormat} onValueChange={setPostFormat}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a post format" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="paragraph">Paragraph</SelectItem>
                                            <SelectItem value="list">List</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="postLength" className="text-sm">Post Length (words)</Label>
                                    <div className="flex items-center space-x-2">
                                        <Slider
                                            id="postLength"
                                            min={50}
                                            max={300}
                                            step={10}
                                            value={[postLength]}
                                            onValueChange={(value) => setPostLength(value[0])}
                                            className="flex-grow"
                                        />
                                        <span className="text-sm text-muted-foreground w-12 text-right">{postLength}</span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="includeHashtags"
                                        checked={includeHashtags}
                                        onCheckedChange={setIncludeHashtags}
                                    />
                                    <Label htmlFor="includeHashtags" className="text-sm">Include Hashtags</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="includeStatistics"
                                        checked={includeStatistics}
                                        onCheckedChange={setIncludeStatistics}
                                    />
                                    <Label htmlFor="includeStatistics" className="text-sm">Include Statistics</Label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Button type="submit" disabled={loading}>
                        {loading ?
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                            </> :
                            "Generate Post"}
                    </Button>
                </form>


                {response && (
                    <Card className="mt-6" ref={postRef}>
                        <CardHeader className="pb-2">
                            <CardTitle>Generated Post</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ReactMarkdown className="prose dark:prose-invert text-sm">{response}</ReactMarkdown>
                            <Button onClick={handleCopy} className="mt-4">
                                <Copy className="mr-2 h-4 w-4" />
                                Copy to Clipboard
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div >
    );
};

export default Generate;
