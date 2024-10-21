import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
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
    plan: {
      type: String,
      enum: ['Free', 'Paid'],
      default: 'Free'
    },
    credits: {
      type: Number,
      default: 5
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};

const User = mongoose.model("User", UserSchema);

export default User;
