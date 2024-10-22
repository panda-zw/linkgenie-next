import { connectDB } from "@/utils/connect";
import User from "../../../../models/User";
import { NextResponse } from 'next/server';

export async function PUT(request) {
    try {
        await connectDB();

        const { userId, updateCredits, updatePlan } = await request.json();
        console.log("Received data for update:", { userId, updateCredits, updatePlan }); // Log incoming data

        if (!userId) {
            return NextResponse.json({ message: "userId is required" }, { status: 400 });
        }

        const user = await User.findById(userId);
        console.log("User found:", user); // Log user details

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
        return NextResponse.json({ message: "Error updating user", error: error.message }, { status: 500 }); // Include error message
    }
}

// Add a GET method for testing
export async function GET() {
    console.log("GET request received in update-user API");
    return NextResponse.json({ message: "Update user API is working" }, { status: 200 });
}
