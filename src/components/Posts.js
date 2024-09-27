"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import PostCard from './PostCard';

function Posts() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

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
        toast(`Post deleted successfully`);
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
  }, [session, posts]);

  return (
    <div>
      <h1 className="text-black text-2xl md:text-2xl lg:text-2xl px-4 md:px-10 lg:px-28 py-10 font-mulish uppercase bg-gray-100">
        All Generated Posts
      </h1>
      <div className="posts-container flex flex-wrap gap-4 justify-center items-center bg-gray-100">
        {posts.map(post => (
          <PostCard key={post._id} post={post} handleDeletion={handlePostDeletion} />
        ))}
      </div>
    </div>
  );
}

export default Posts;