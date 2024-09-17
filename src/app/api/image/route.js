import Groq from "groq-sdk";
import { uploadImage } from '@/lib/uploadImage';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
    const formData = await req.formData();
    const textMessage = formData.get('textMessage');
    const imageFile = formData.get('imageUrl');

    if (!textMessage && !imageFile) {
        return new Response(JSON.stringify({ error: 'Text message or image is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const imageUrl = imageFile ? await uploadImage(imageFile) : null;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: textMessage },
                        imageUrl ? { type: "image_url", image_url: { url: imageUrl } } : null
                    ].filter(Boolean)
                }
            ],
            model: "llava-v1.5-7b-4096-preview",
        });

        return new Response(JSON.stringify({ content: chatCompletion.choices[0]?.message?.content || "" }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error fetching data from GROQ: ", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch data from GROQ' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
