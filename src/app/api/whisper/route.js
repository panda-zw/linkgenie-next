import fs from 'fs';
import Groq from 'groq-sdk';
import multer from 'multer';


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Set up multer for file uploads
const upload = multer({ dest: './uploads/' }); // Temporary storage location


handler.use(upload.single('file')); // Expecting a single file upload with the field name 'file'

handler.post(async (req, res) => {
    try {
        const transcription = await groq.audio.transcriptions.create({
            file: fs.createReadStream(req.file.path), // Use the uploaded file's path
            model: "distil-whisper-large-v3-en",
            response_format: "verbose_json",
        });
        // Clean up the uploaded file after processing
        fs.unlinkSync(req.file.path); // Remove the file after processing
        return res.status(200).json({ text: transcription.text });
    } catch (error) {
        console.error('Error fetching data from GROQ:', error);
        return res.status(500).json({ error: 'Failed to fetch data from GROQ' });
    }
});

export default handler;