"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // For fetching the session
import { useRouter } from "next/navigation";

const Generate = () => {
  const [generatedPost, setGeneratedPost] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession(); // Fetch the user's session
  const [credits, setCredits] = useState(0); // Initialize with 0 credits
  const router = useRouter();

  useEffect(() => {
    if (session) {
      setCredits(session.user.credits || 0); // Update credits when session changes
    }
  }, [session]);

  const handleGeneratePost = async () => {
    setLoading(true);

    // Assuming you have logic to generate the post here
    const postContent = "This is your generated post."; // Replace with actual post generation logic
    //console.log('auth: ', session)
    try {
      // Deduct a credit by calling your API
      const response = await fetch(`/api/deduct-credits/${session.user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //Authorization: Bearer `${session.accessToken}`, // Include the token if necessary
        },
      });

      const result = await response.json();
      if (response.ok) {
        // Successfully deducted credit, update UI
        setCredits(result.credits); // Update the number of credits from the API response
        setGeneratedPost(postContent);
        alert("Post generated! 1 credit deducted.");
      } else {
        alert(result.message || "Error deducting credit.");
        if (result.message === "Unauthorized") {
          // Redirect to login if user is not authenticated
          router.push("/SignIn");
        }
      }
    } catch (error) {
      console.error("Error generating post:", error);
      alert("Failed to generate post.");
    }

    setLoading(false);
  };

  return (
    <div className="p-4 flex items-center justify-center">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-white">Generate Post</h1>

        <button
          onClick={handleGeneratePost}
          className="bg-blue-500 text-white py-2 px-4 rounded"
          disabled={loading || credits <= 0}
        >
          {loading ? "Generating..." : "Generate Post"}
        </button>

        <div className="mt-4 text-white">
          <p>
            <strong>Credits left:</strong> {credits}
          </p>
        </div>

        {generatedPost && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h2 className="text-xl font-bold mb-2">Your Generated Post:</h2>
            <p>{generatedPost}</p>
          </div>
        )}

        {credits <= 0 && (
          <div className="mt-4 text-red-500">
            <p>You don't have enough credits to generate a post.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Generate;
