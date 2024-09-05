import { mongoose } from "mongoose";

const PostSchema = mongoose.Schema({
    post: {
        type: String,
        required: [true, "Must provide a post"]
    },
    timestamps: true
})