import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { userMessage } = req.body;

        if (!userMessage) {
            return res.status(400).json({ error: 'Message is required' });
        }

        try {
            const chatCompletion = await getGroqChatCompletion(userMessage);
            res.status(200).json({ content: chatCompletion.choices[0]?.message?.content || "" });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch data from GROQ' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

async function getGroqChatCompletion(userMessage) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: userMessage,
            },
        ],
        model: "llama-3.1-8b-instant",
    });
}