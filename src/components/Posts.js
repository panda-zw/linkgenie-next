"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import PostCard from './PostCard';
import Swal from 'sweetalert2';

function Posts() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handlePostDeletion = async (postId) => {
    try {
      const res = await fetch(`/api/posts/delete/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const body = await res.json();

      if (!res.ok) {
        throw new Error("Failed to delete");
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Post deleted successfully',
          showConfirmButton: false,
          timer: 1500
        });
        setPosts(posts.filter((post) => post.id !== postId))

      }
    } catch (error) {
      console.log("Failed to delete:", error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      if (session) {
        try {
          const res = await fetch(`/api/posts?id=${session.user.id}`);
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await res.json();
          setPosts(data);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      }
    };

    fetchPosts();
  }, [session]);

  const filteredPosts = posts.filter(post =>
    post.post.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='min-h-screen px-2 lg:px-4 bg-gray-100 py-20'>
      <div className="px-24 font-mulish">
        <h1 className="text-2xl font-extrabold mb-8 mt-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          All Generated Posts
        </h1>
      </div>
      <div className="search-container px-6 md:px-12 lg:px-28 py-8 bg-gray-100">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search for a post..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 pl-12 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out shadow-sm"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="posts-container flex flex-wrap gap-4 justify-center items-center bg-gray-100">
        {filteredPosts.map(post => (
          <PostCard key={post._id} post={post} handleDeletion={handlePostDeletion} />
        ))}
      </div>
    </div>
  );
}

export default Posts;