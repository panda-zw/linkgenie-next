import { connectDB } from "@/utils/connect";
import User from "../../../../../models/User";
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    try {
        await connectDB();
        const { id } = params;
        console.log('id email: ',id)
        const user = await User.findOne({ email: id });
        console.log('the user: ',user)

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ credits: user.credits }, { status: 200 });
    } catch (error) {
        console.error("Error while fetching credits:", error.message);
        return NextResponse.json({ message: "Error fetching credits", error: error.message }, { status: 500 });
    }
}