import mongoose from "mongoose";

const trainingScheduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
  },
  { timestamps: true }
);

const TrainingSchedule = mongoose.model(
  "TrainingSchedule",
  trainingScheduleSchema
);
export default TrainingSchedule;
