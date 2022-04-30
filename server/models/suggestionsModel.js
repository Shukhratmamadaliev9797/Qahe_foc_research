import mongoose from "mongoose";

const suggestionSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    writer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    email: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, required: false },
  },
  { timestamps: true }
);

const Suggestion = mongoose.model("Suggestion", suggestionSchema);
export default Suggestion;
