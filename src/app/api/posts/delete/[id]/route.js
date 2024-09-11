import { connectDB } from "@/utils/connect";
import Post from "../../../../../../models/Post";
import { NextResponse } from "next/server";

export async function DELETE(req, params) {
  try {
    await connectDB();

    const  id = params.params.id;
    const postExists = await Post.findById(id);;

    if (!postExists) {
      return NextResponse.json(
        { message: "User doesn't exist" },
        { status: 404 }
      );
    }

    const deletePost = await Post.findByIdAndDelete(id);


    if (deletePost) {
      console.log("post deleted");
    }

    return NextResponse.json({ message: "Post Deleted" }, { status: 201 });
  } catch (error) {
    console.error("Error while deleting post", error);
    return NextResponse.json(
      { message: "Error while deleting the post" },
      { status: 500 }
    );
  }
}



