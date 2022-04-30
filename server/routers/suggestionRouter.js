import express from "express";
import expressAsyncHandler from "express-async-handler";
import Suggestion from "../models/suggestionsModel.js";
import {
  generateToken,
  isAuth,
  isAdmin,
  isStuff,
  isAdminOrWriter,
} from "../util.js";

const suggestionRouter = express.Router();

suggestionRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const suggestions = await Suggestion.find({});
    res.send(suggestions);
  })
);

suggestionRouter.post(
  "/createSuggestion",
  expressAsyncHandler(async (req, res) => {
    const suggestion = new Suggestion({
      fullName: req.body.fullName,
      email: req.body.email,
      message: req.body.message,
      status: req.body.status,
    });
    const createdSuggestion = await suggestion.save();
    res.send({ message: "Suggestion created", suggestion: createdSuggestion });
  })
);

suggestionRouter.put(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const suggestion = await Suggestion.findById(req.params.id);
    if (suggestion) {
      suggestion.status = req.body.status || suggestion.status;

      const updatedSuggestion = await suggestion.save();
      res.send({
        message: "Suggestion Status Updated",
        user: updatedSuggestion,
      });
    }
  })
);
export default suggestionRouter;
