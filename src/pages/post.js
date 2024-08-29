// pages/index.js
import { useEffect, useState } from 'react';

export default function Home() {
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchGroqResponse = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/groq', {
                method: 'POST',
            });
            const data = await res.json();
            setResponse(data.content);
        } catch (error) {
            console.error('Error fetching GROQ response:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroqResponse();
    }, []);

    return (
        <div>
            <h1>GROQ Chat Completion</h1>
            {loading ? <p>Loading...</p> : <p>{response}</p>}
        </div>
    );
}