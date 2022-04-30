import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    fileLink: { type: String, required: true },
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", documentSchema);
export default Document;
