import { connectDB } from "@/utils/connect";
import User from "../../../../models/User";
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
    try {
        await connectDB();

        // Attempt to get session
        const session = await getServerSession(req, authOptions);
        console.log("Session retrieved:", session);

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id; // Use 'id' from the session
        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        if (user.credits > 0) {
            user.credits -= 1;
            await user.save();

            return NextResponse.json({ message: "Credit deducted successfully", credits: user.credits }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Insufficient credits" }, { status: 400 });
        }

    } catch (error) {
        console.error("Error while deducting credit:", error.message);
        return NextResponse.json({ message: "Error deducting credit", error: error.message }, { status: 500 });
    }
}