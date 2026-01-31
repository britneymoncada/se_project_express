import mongoose from "mongoose";
import validator from "validator";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    weather: {
      type: String,
      required: true,
      enum: ["hot", "warm", "cold"],
    },
    imageUrl: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validator.isURL(v),
        message: "Invalid image URL",
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("clothingItem", itemSchema);
