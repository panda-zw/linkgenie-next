import { connectDB } from "@/utils/connect";
import User from "../../../../models/User";
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        await connectDB();

        const { userId } = await req.json();
        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        user.credits += 10;
        await user.save();

        return NextResponse.json({ message: "Credits incremented successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error while incrementing credits", error);
        return NextResponse.json({ message: "Error incrementing credits" }, { status: 500 });
    }
}