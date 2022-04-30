import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

const emailRouter = express.Router();

dotenv.config();
emailRouter.post("/sent", (req, res) => {
  let data = req.body;
  let smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
      user: "foc.research.center@gmail.com",
      pass: "UlsterUniversity",
    },
  });

  let mailOptions = {
    from: data.email,
    to: "foc.research.center@gmail.com",
    subject: `Message from ${data.firstName} ${data.lastName}`,
    html: `
    <h2>Email Information</h2>
    <ul>
    <li>${data.firstName} ${data.lastName}</li>
    <li>${data.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${data.message}</p>
      `,
  };

  smtpTransport.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Success");
    }
  });

  smtpTransport.close();
});

export default emailRouter;
