import { mongoose } from "mongoose";


export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB connection successful");
    } catch (error) {
        console.log("DB connection failed", error)
    }

}