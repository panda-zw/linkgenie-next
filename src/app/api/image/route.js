import Groq from "groq-sdk";
import { uploadImage } from '@/lib/uploadImage';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
    const formData = await req.formData();
    const textMessage = formData.get('textMessage');
    const imageFile = formData.get('image');

    if (!textMessage && !imageFile) {
        return new Response(JSON.stringify({ error: 'Text message or image is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        // Upload image if available
        const imageUrl = imageFile ? await uploadImage(imageFile) : null;

        // Construct the message with the image link (if any)
        const messageContent = textMessage + (imageUrl ? `\n[Image](${imageUrl})` : "");

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: messageContent,
                }
            ],
            model: "llava-v1.5-7b-4096-preview", // Ensure this model supports image + text input if needed
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
