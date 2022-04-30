import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    writer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: { type: String, required: true },
    image1: { type: String, required: true },
    paragraph1: { type: String, required: true },
    image2: { type: String, required: false },
    paragraph2: { type: String, required: false },
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);
export default Article;
