import { connectDB } from "@/utils/connect";
import User from "../../../../models/User";
import Post from "../../../../models/Post";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { post, id } = await req.json();
    const userExists = await User.findById(id).populate("posts");

    if (!userExists) {
      return NextResponse.json(
        { message: "User doesn't exist" },
        { status: 404 }
      );
    }

    const newPost = await Post.create({ post, user: id });

    if (!userExists.posts) {
      userExists.posts = [];
    }

    userExists.posts.push(newPost._id);
    await userExists.save();

    if (newPost) {
      console.log("post saved");
    }

    return NextResponse.json({ message: "Post Saved" }, { status: 201 });
  } catch (error) {
    console.error("Error while saving post", error);
    return NextResponse.json(
      { message: "Error while saving the post" },
      { status: 500 }
    );
  }
}
