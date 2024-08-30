import Groq from "groq-sdk";

const groq = new Groq({ apiKey: "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" });

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const chatCompletion = await getGroqChatCompletion();
            res.status(200).json({ content: chatCompletion.choices[0]?.message?.content || "" });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch data from GROQ' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

async function getGroqChatCompletion() {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: "write a short linkedln post about connections with hashtags and emojis",
            },
        ],
        model: "llama3-8b-8192",
    });
}