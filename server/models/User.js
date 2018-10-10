import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: [true, "Firstname is required!"]
    },
    lastname: {
      type: String,
      trim: true,
      required: [true, "Lastname is required!"]
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      validate: [isEmail, "Invalid Email Address!"],
      required: [true, "Email is required!"]
    },
    password: {
      type: String,
      required: [true, "Password is required!"]
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
