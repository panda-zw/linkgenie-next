import { promises as fs } from 'fs';
import path from 'path';

// Function to upload image locally to the /public/uploads directory
export async function uploadImage(imageFile) {
    // Define the uploads directory path
    const uploadDir = path.join(process.cwd(), 'public/uploads');

    // Ensure the upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Create a unique file name (you can use the original name or generate a unique one)
    const fileName = `${Date.now()}-${imageFile.name}`;
    const filePath = path.join(uploadDir, fileName);

    // Convert the file to a buffer and write it to the filesystem
    const fileData = Buffer.from(await imageFile.arrayBuffer());
    await fs.writeFile(filePath, fileData);

    // Construct the full URL based on your server configuration
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000'; // Use BASE_URL from env or default to localhost
    return `${baseUrl}/uploads/${fileName}`;
}
