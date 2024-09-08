import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Must provide a username."],
      unique: [true, "Must be unique."],
    },
    email: {
      type: String,
      required: [true, "Must provide an email."],
      unique: [true, "Must be unique."],
    },
    password: {
      type: String,
      required: [true, "Must provide a password."],
    },
    credits: {
      type: Number,
      default: 5,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", 
        default: []
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
