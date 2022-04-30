import express from "express";
import expressAsyncHandler from "express-async-handler";
import TrainingSchedule from "../models/trainingEventsModel.js";
import {
  generateToken,
  isAuth,
  isAdmin,
  isStuff,
  isAdminOrWriter,
} from "../util.js";

const trainingScheduleRouter = express.Router();

trainingScheduleRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const trainingSchedule = await TrainingSchedule.find({});
    res.send(trainingSchedule);
  })
);

trainingScheduleRouter.post(
  "/createTrainingSchedule",

  expressAsyncHandler(async (req, res) => {
    const trainingSchedule = new TrainingSchedule({
      title: req.body.title,
      start: req.body.startDate,
      end: req.body.endDate,
    });
    const createdTrainingSchedule = await trainingSchedule.save();
    res.send({
      message: "TrainingSchedule created",
      trainingSchedule: createdTrainingSchedule,
    });
  })
);

export default trainingScheduleRouter;
