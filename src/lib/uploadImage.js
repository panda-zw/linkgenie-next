import { promises as fs } from 'fs';
import path from 'path';

export async function uploadImage(imageFile) {
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    const fileName = `${Date.now()}-${imageFile.name}`;
    const filePath = path.join(uploadDir, fileName);

    const fileData = Buffer.from(await imageFile.arrayBuffer());
    await fs.writeFile(filePath, fileData);

    // Use environment variable or default to localhost
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    return `${baseUrl}/uploads/${fileName}`;
}
