"use client";

import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ClientForm() {
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const resultRef = useRef(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const formData = new FormData();
            formData.append('file', file);

            try {
                const uploadResponse = await fetch('/api/imagey', {
                    method: 'POST',
                    body: formData,
                });

                const uploadData = await uploadResponse.json();
                if (uploadResponse.ok) {
                    setImageUrl(uploadData.url);
                    toast.success("Image uploaded successfully!");
                } else {
                    throw new Error(uploadData.error || "Upload failed");
                }
            } catch (error) {
                console.error("Image upload error:", error);
                toast.error("Failed to upload image.");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponseData(null);

        try {
            const res = await fetch('/api/imagey', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userMessage: "Your message here", imageUrl, model: "llava-v1.5-7b-4096-preview" }),
            });

            const newData = await res.json();
            if (res.ok) {
                setResponseData(newData.content);
                toast.success("Response generated successfully!");

                setTimeout(() => {
                    resultRef.current?.scrollIntoView({ behavior: "smooth" });
                }, 100);
            } else {
                throw new Error(newData.error || "Response generation failed");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error generating the response.");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(responseData || 'No content generated.')
            .then(() => toast.success('Response copied to clipboard!'))
            .catch(err => console.error('Failed to copy response:', err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Let’s help you find a project post.</h2>

            <input type="file" onChange={handleImageUpload} />

            <button type="submit" disabled={loading}>
                {loading ? 'Generating...' : 'Generate'}
            </button>

            {!responseData && <p>Your post generation here</p>}

            {responseData && (
                <div>
                    <h3>Generated Post:</h3>
                    <ReactMarkdown>{responseData}</ReactMarkdown>
                    <button onClick={handleCopy}>Copy to Clipboard</button>
                </div>
            )}
        </form>
    );
}