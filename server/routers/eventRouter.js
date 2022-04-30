import express from "express";
import expressAsyncHandler from "express-async-handler";
import Event from "../models/eventModel.js";
import { isAdmin, isAuth } from "../util.js";

const eventRouter = express.Router();

eventRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const events = await Event.find({});
    res.send(events);
  })
);

eventRouter.post(
  "/createEvent",
  expressAsyncHandler(async (req, res) => {
    const event = new Event({
      name: req.body.eventName,
      presenter: req.body.eventPresenter,
      about: req.body.aboutEvent,
      startDate: req.body.startEventDate,
      endDate: req.body.endEventDate,
      startTime: req.body.startEventTime,
      endTime: req.body.endEventTime,
      location: req.body.eventLocation,
    });
    const createdEvent = await event.save();
    res.send({ message: "Event created", event: createdEvent });
  })
);

eventRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (event) {
      const deleteEvent = await event.remove();
      res.send({ message: "Event Deleted", event: deleteEvent });
    } else {
      res.status(404).send({ message: "Event Not Found" });
    }
  })
);

eventRouter.put(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (event) {
      event.name = req.body.eventName || event.name;
      event.presenter = req.body.eventPresenter || event.presenter;
      event.about = req.body.aboutEvent || event.about;
      event.startDate = req.body.startEventDate || event.startDate;
      event.endDate = req.body.endEventDate || event.endDate;
      event.startTime = req.body.startEventTime || event.startTime;
      event.endTime = req.body.endEventTime || event.endTime;
      event.location = req.body.eventLocation || event.location;
      const updatedEvent = await event.save();
      res.send({
        message: "Event Updated",
        user: updatedEvent,
      });
    }
  })
);

export default eventRouter;
