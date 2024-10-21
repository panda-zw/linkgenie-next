import { connectDB } from "@/utils/connect";
import User from "../../../../models/User";
import { NextResponse } from 'next/server';

export async function PUT(request) {
    try {
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

// Add a GET method for testing
export async function GET() {
    console.log("GET request received in update-user API");
    return NextResponse.json({ message: "Update user API is working" }, { status: 200 });
}