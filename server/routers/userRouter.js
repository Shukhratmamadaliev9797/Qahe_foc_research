import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken, isAuth, isAdmin, isStuff } from "../util.js";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.get(
  "/colleagues",
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);
userRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);
userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ userId: req.body.userId });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        console.log(user);
        res.send({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          userId: user.userId,
          email: user.email,
          isAdmin: user.isAdmin,
          isStaff: user.isStaff,
          createdAt: user.createdAt,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid user ID or password" });
  })
);
userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      userId: req.body.userId,
      password: bcrypt.hashSync(req.body.password, 8),
      isAdmin: req.body.isAdmin,
      isStaff: req.body.isStaff,
    });
    const createdUser = await user.save();

    res.send({
      _id: createdUser._id,
      userId: createdUser.userId,
      isAdmin: createdUser.isAdmin,
      isStaff: user.isStaff,
      token: generateToken(createdUser),
    });
  })
);

userRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      const deleteUser = await user.remove();
      res.send({ message: "User Deleted", user: deleteUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

userRouter.put(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.userId = req.body.userId || user.userId;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        message: "User Updated",
        user: updatedUser,
      });
    }
  })
);

userRouter.put(
  "/profile/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      user.image = req.body.profileImage || user.image;
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.aboutMe = req.body.aboutMe || user.aboutMe;
      user.interests = req.body.interests || user.interests;
      user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
      user.email = req.body.email || user.email;
      user.address = req.body.address || user.address;
      user.twitterLink = req.body.twitterLink || user.twitterLink;
      user.facebookLink = req.body.facebookLink || user.facebookLink;
      user.linkedinLink = req.body.twitterLink || user.linkedinLink;

      const updatedUser = await user.save();

      res.send({
        _id: updatedUser._id,
        image: updatedUser.image,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        aboutMe: updatedUser.aboutMe,
        interests: updatedUser.interests,
        phoneNumber: updatedUser.phoneNumber,
        email: updatedUser.email,
        address: updatedUser.address,
        twitterLink: updatedUser.twitterLink,
        facebookLink: updatedUser.facebookLink,
        linkedinLink: updatedUser.linkedinLink,
        isAdmin: updatedUser.isAdmin,
        isStaff: updatedUser.isStaff,
        token: generateToken(updatedUser),
      });
    }
  })
);
export default userRouter;
