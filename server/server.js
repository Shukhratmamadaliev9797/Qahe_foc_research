import express from "express";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import uploadRouter from "./routers/uploadRouter.js";
import uploadFileRouter from "./routers/uploadFileRouter.js";
import userRouter from "./routers/userRouter.js";
import articleRouter from "./routers/articleRouter.js";
import suggestionRouter from "./routers/suggestionRouter.js";
import trainingScheduleRouter from "./routers/trainingScheduleRouter.js";
import documentRouter from "./routers/documentRouter.js";
import eventRouter from "./routers/eventRouter.js";
import cors from "cors";
import emailRouter from "./routers/emailRouter.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/qahe", {});

app.use("/api/users", userRouter);
app.use("/api/articles", articleRouter);
app.use("/api/suggestions", suggestionRouter);
app.use("/api/trainingSchedule", trainingScheduleRouter);
app.use("/api/documents", documentRouter);
app.use("/api/events", eventRouter);
app.use("/api/uploads", uploadRouter);
app.use("/api/uploadsFile", uploadFileRouter);
app.use("/api/email", emailRouter);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/build/index.html"))
);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
const server = app.listen(process.env.PORT || 5000, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
});
