import mongoose from "mongoose";
import validator from "validator";

const clothingItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [30, "Name must be at most 30 characters"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      validate: {
        validator: (v) => validator.isURL(v),
        message: "Image URL must be a valid URL",
      },
    },
    weather: {
      type: String,
      required: [true, "Weather is required"],
      enum: {
        values: ["hot", "warm", "cold"],
        message: "Weather must be one of: hot, warm, cold",
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const ClothingItem = mongoose.model("ClothingItem", clothingItemSchema);

export default ClothingItem;
