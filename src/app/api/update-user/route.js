import { connectDB } from "@/utils/connect";
import User from "../../../../models/User";
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function PUT(req) {
    try {
        await connectDB();

        const { userId, username, email, password } = await req.json();

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Check for existing username or email conflicts
        if (username || email) {
            const exists = await User.findOne({
                $or: [{ email }, { username }],
                _id: { $ne: userId }, // Exclude current user
            });

            if (exists) {
                return NextResponse.json({ message: "Username or email already exists." }, { status: 409 });
            }
        }

        // Update user fields if provided
        if (username) user.username = username;
        if (email) user.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();

        return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error while updating profile", error);
        return NextResponse.json({ message: "Error while updating profile" }, { status: 500 });
    }
}
