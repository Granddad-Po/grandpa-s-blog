import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    text: {
      type: String,
      required: true,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    tags: {
      type: Array,
      default: [],
    },
    imageUrl: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", PostSchema);
