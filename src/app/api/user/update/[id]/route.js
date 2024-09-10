import { connectDB } from "@/utils/connect";
import User from '../../../../../../models/User'
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
    try {
        await connectDB();
        const { id } = params; // Use 'id' instead of 'userId'

        const userInfo = await req.json();
        const user = await User.findByIdAndUpdate(id, userInfo, { new: true });
        //console.log(user);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }


        return NextResponse.json({ message: "User updated successfully", user }, { status: 200 });
    } catch (error) {
        console.error("An error occurred:", error.message);
        return NextResponse.json({ message: "An error occurred wwhile upadating user info", error: error.message }, { status: 500 });
    }
}