import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Copy, Trash2 } from "lucide-react";

const PostCard = ({ post, handleDeletion }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const truncateContent = (content, maxLength) => {
        if (content.length > maxLength) {
            return content.substring(0, maxLength) + '...';
        }
        return content;
    };

    const handlePostDeletion = async () => {
        try {
            handleDeletion(post._id);
            toast.success('Post deleted successfully');
        } catch (error) {
            toast.error('Failed to delete post');
            console.log("Failed to delete:", error);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(post.post).then(() => {
            toast.success('Post content copied to clipboard!');
        }).catch((error) => {
            toast.error('Failed to copy post content');
            console.error('Error copying text: ', error);
        });
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Card
            className={`mb-6 cursor-pointer transition-all duration-200 ${isExpanded ? 'max-w-2xl' : 'max-w-sm'}`}
            onClick={toggleExpand}
        >
            <CardContent className="pt-6">
                <div className="mb-2 text-lg font-semibold tracking-tight">
                    <ReactMarkdown>
                        {isExpanded ? post.post : truncateContent(post.post, 100)}
                    </ReactMarkdown>
                </div>
                <p className="text-sm text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString()}
                </p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard();
                    }}
                >
                    <Copy className="h-4 w-4" />
                </Button>
                {!isExpanded && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePostDeletion();
                        }}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default PostCard;
