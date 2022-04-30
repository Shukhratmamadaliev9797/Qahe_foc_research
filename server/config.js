import dotenv from "dotenv";

dotenv.config();

export default {
  accessKeyId: process.env.accessKeyId || "accessKeyId",
  secretAccessKey: process.env.secretAccessKey || "secretAccessKey",
  EMAIL: process.env.user || "user email",
  pass: process.env.pass || "pass",
};
