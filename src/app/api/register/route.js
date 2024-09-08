import { connectDB } from "@/utils/connect";
import User from "../../../../models/User";
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req) {
    try {
        await connectDB();

        const { username, email, password } = await req.json();
        const exists = await User.findOne({ $or: [{ email }, { username }] });
        if (exists) {
            return NextResponse.json({ message: "Username or email already exists." }, { status: 409 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ username, email, password: hashedPassword });

        return NextResponse.json({ message: "User Registered" }, { status: 201 });

    } catch (error) {
        console.error("Error while registering user", error);
        return NextResponse.json({ message: "Error while registering the user" }, { status: 500 });
    }
}