import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
    const { userMessage, imageUrl, model } = await req.json();

    if (!userMessage || !model) {
        return new Response(JSON.stringify({ error: 'Message and model are required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const chatCompletion = await getGroqChatCompletion(userMessage, imageUrl, model);
        return new Response(JSON.stringify({ content: chatCompletion.choices[0]?.message?.content || "" }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching data from GROQ:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch data from GROQ' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

async function getGroqChatCompletion(userMessage, imageUrl, model) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: userMessage
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url: imageUrl
                        }
                    }
                ]
            }
        ],
        model,
        temperature: 0,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null,
    });
}