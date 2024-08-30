import { useEffect, useState } from 'react';

export default function Home() {
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [userMessage, setUserMessage] = useState(""); // State for user input

    const fetchGroqResponse = async (message) => {
        setLoading(true);
        try {
            const res = await fetch('/api/groq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set content type
                },
                body: JSON.stringify({ userMessage: message }), // Send user message
            });
            const data = await res.json();
            setResponse(data.content);
        } catch (error) {
            console.error('Error fetching GROQ response:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        fetchGroqResponse(userMessage); // Fetch response with user message
        setUserMessage(""); // Clear input after submission
    };

    return (
        <div>
            <h1>GROQ Chat Completion</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)} // Update state on input change
                    placeholder="Type your message here..."
                    required
                />
                <button type="submit">Send</button>
            </form>
            {loading ? <p>Loading...</p> : <p>{response}</p>}
        </div>
    );
}