import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

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
        <div
            className={`block p-6 bg-white border border-gray-300 rounded-lg mb-14 shadow-md hover:shadow-lg transition-shadow duration-200 ${isExpanded ? 'max-w-2xl' : 'max-w-sm'}`}
            onClick={toggleExpand}
        >
            <h5 className="mb-2 text-lg font-mulish font-semibold tracking-tight text-gray-800">
                <ReactMarkdown>
                    {isExpanded ? post.post : truncateContent(post.post, 100)}
                </ReactMarkdown>
            </h5>
            <p className="text-sm text-gray-600">
                {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <div className='flex space-x-2 mt-4'>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard();
                    }}
                    className=""
                >
                    <Image src="/icons/copy.png" alt="Copy" width={30} height={30} className='hover:scale-150 transition ease-in-out duration-300' />
                </button>
                {!isExpanded && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePostDeletion();
                        }}
                        className=""
                    >
                        <Image src="/icons/bin.png" alt="Delete" width={25} height={25} className='hover:scale-150 transition duration-300 ease-in-out' />
                    </button>
                )}
            </div>
        </div>
    );
};

export default PostCard;
