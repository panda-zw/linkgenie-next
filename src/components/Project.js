"use client";
import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Swal from 'sweetalert2';

export default function ClientForm() {
    const [technicalInterests, setTechnicalInterests] = useState("");
    const [projectScope, setProjectScope] = useState("");
    const [industryFocus, setIndustryFocus] = useState("");
    const [learningGoals, setLearningGoals] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const [difficultyLevel, setDifficultyLevel] = useState("");
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);

    const resultRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponseData(null);
        try {
            const res = await fetch('/api/finder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userMessage: messageContent }),
            });

            const newData = await res.json();
            setResponseData(newData.content);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Project idea generated successfully!',
            });

            setTimeout(() => {
                resultRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error generating the project idea.',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(responseData || 'No content generated.')
            .then(() => Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Project idea copied to clipboard!',
            }))
            .catch(err => console.error('Failed to copy post:', err));
    };

    return (
        <div className="min-h-screen px-4 py-8 bg-background">
            <div className="max-w-8xl mx-auto px-5">
                <h1 className="text-2xl font-extrabold mb-8 mt-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Let&apos;s help you find a project
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle>Generate Project Idea</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <Label htmlFor="technicalInterests" className="text-sm">Technical Interests</Label>
                                <Textarea
                                    id="technicalInterests"
                                    value={technicalInterests}
                                    onChange={(e) => setTechnicalInterests(e.target.value)}
                                    placeholder="AI, Web Dev, Blockchain"
                                    className="mt-1 h-20"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                <div>
                                    <Label htmlFor="projectScope" className="text-sm">Project Scope</Label>
                                    <Input
                                        id="projectScope"
                                        value={projectScope}
                                        onChange={(e) => setProjectScope(e.target.value)}
                                        placeholder="full-stack, backend only, research"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="industryFocus" className="text-sm">Industry Focus</Label>
                                    <Input
                                        id="industryFocus"
                                        value={industryFocus}
                                        onChange={(e) => setIndustryFocus(e.target.value)}
                                        placeholder="fintech, healthcare, gaming"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="learningGoals" className="text-sm">Learning Goals</Label>
                                    <Input
                                        id="learningGoals"
                                        value={learningGoals}
                                        onChange={(e) => setLearningGoals(e.target.value)}
                                        placeholder="React, TensorFlow, Docker"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="targetAudience" className="text-sm">Target Audience</Label>
                                    <Input
                                        id="targetAudience"
                                        value={targetAudience}
                                        onChange={(e) => setTargetAudience(e.target.value)}
                                        placeholder="developers, students, general public"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="difficultyLevel" className="text-sm">Difficulty Level</Label>
                                    <Input
                                        id="difficultyLevel"
                                        value={difficultyLevel}
                                        onChange={(e) => setDifficultyLevel(e.target.value)}
                                        placeholder="basic, intermediate, advanced"
                                        className="mt-1"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Button type="submit" disabled={loading} className="">
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            "Generate Project"
                        )}
                    </Button>
                </form>

                {responseData && (
                    <Card className="mt-6" ref={resultRef}>
                        <CardHeader className="pb-2">
                            <CardTitle>Generated Project Idea</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ReactMarkdown className="prose dark:prose-invert text-sm">{responseData}</ReactMarkdown>
                            <Button onClick={handleCopy} className="mt-4">
                                <Image src="/icons/copy.png" alt="Copy" width={16} height={16} className="mr-2" />
                                Copy to Clipboard
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {loading && (
                    <div className="flex items-center justify-center space-x-2 mt-4">
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse delay-75"></div>
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse delay-150"></div>
                        <span className="text-sm text-primary font-medium">Generating project...</span>
                    </div>
                )}
            </div>
        </div>
    );
}
