import { connectDB } from "@/utils/connect";
import User from "../../../../models/User";
import { NextResponse } from 'next/server';
import { authMiddleware } from "@/middleware";

export async function PUT(request) {
    try {

        const session = await authMiddleware(request);

        if (session instanceof NextResponse) {
            return session; // Return the unauthorized response if session is not valid
        }

        await connectDB();

        const { userId, updateCredits, updatePlan } = await request.json();

        if (!userId) {
            return NextResponse.json({ message: "userId is required" }, { status: 400 });
        }

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        if (updateCredits) {
            user.credits += 100;
        }
        if (updatePlan) {
            user.plan = 'Paid';
        }

        await user.save();

        return NextResponse.json({ message: "Profile updated successfully", user }, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ message: "Error updating user" }, { status: 500 });
    }
}
