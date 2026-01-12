import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [30, "Name must be at most 30 characters"],
    },
    avatar: {
      type: String,
      required: [true, "Avatar URL is required"],
      validate: {
        validator: (v) => validator.isURL(v),
        message: "Avatar must be a valid URL",
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: "Email must be valid",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

export default User;
