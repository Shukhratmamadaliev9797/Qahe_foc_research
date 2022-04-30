import mongoose from "mongoose";

const userScheme = new mongoose.Schema(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    aboutMe: { type: String, required: false },
    interests: { type: String, required: false },
    userId: { type: String, required: true, unique: true },
    email: { type: String, unique: false },
    image: { type: String, required: false },
    twitterLink: { type: String, required: false },
    facebookLink: { type: String, required: false },
    linkedinLink: { type: String, required: false },
    address: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    isStaff: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userScheme);
export default User;
