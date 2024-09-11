import React from 'react';
import { toast } from 'react-toastify';

const PostCard = ({ post, handleDeletion }) => {
    const truncateContent = (content, maxLength) => {
        if (content.length > maxLength) {
            return content.substring(0, maxLength) + '...';
        }
        return content;
    };

    const handlePostDeletion = async () => {
        try {
          handleDeletion(post.id);
        } catch (error) {
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

    return (
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {truncateContent(post.post, 100)} {/* Display only 100 characters */}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <button
                onClick={copyToClipboard}
                className="mt-4 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
                Copy Post
            </button>
        </div>
    );
};

export default PostCard;
