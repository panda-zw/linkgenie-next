import { connectDB } from "@/utils/connect";
import User from "../../../../models/User";
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req) {
    try {
        await connectDB();

        const { email, password } = await req.json();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
        }

        console.log(`User logged in: ${email}`);

        return NextResponse.json({ message: "Login successful" }, { status: 200 });

    } catch (error) {
        console.error("Error during login", error);
        return NextResponse.json({ message: "Error during login" }, { status: 500 });
    }
}
