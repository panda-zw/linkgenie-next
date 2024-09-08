import { mongoose } from "mongoose";

const PostSchema = mongoose.Schema(
  {
    post: {
      type: String,
      required: [true, "Must provide a post"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
