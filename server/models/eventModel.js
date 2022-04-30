import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    presenter: { type: String, required: true },
    about: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
