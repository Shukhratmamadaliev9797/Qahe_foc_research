import multer from "multer";
import express from "express";
import { isAuth } from "../util.js";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import dotenv from "dotenv";
const uploadFileRouter = express.Router();
dotenv.config();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}`);
  },
});

const upload = multer({ storage });

uploadFileRouter.post("/", isAuth, upload.single("doc"), (req, res) => {
  res.send(`/${req.file.path}`);
});

const s3 = new aws.S3({
  region: "eu-west-2",
  accessKeyId: "AKIA4OSAHYJFURUP5YCD",
  secretAccessKey: "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",
  AWS_SDK_LOAD_CONFIG: 1,
});

const storageS3 = multerS3({
  s3,
  bucket: "e-commerce-shukhrat-bucket",
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key(req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadS3 = multer({ storage: storageS3 });
uploadFileRouter.post("/s3", uploadS3.single("doc"), (req, res) => {
  res.send(req.file.location);
});

export default uploadFileRouter;
