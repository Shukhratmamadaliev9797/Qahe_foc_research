import express from "express";
import expressAsyncHandler from "express-async-handler";
import Document from "../models/documentModel.js";
import {
  generateToken,
  isAuth,
  isAdmin,
  isStuff,
  isAdminOrWriter,
} from "../util.js";

const documentRouter = express.Router();

documentRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const documents = await Document.find({});
    res.send(documents);
  })
);

documentRouter.post(
  "/uploadDocument",
  expressAsyncHandler(async (req, res) => {
    const document = new Document({
      fileName: req.body.fileName,
      fileLink: req.body.fileLink,
    });
    const createdFile = await document.save();
    res.send({ message: "Document Uploader", document: createdFile });
  })
);

export default documentRouter;
