import { createError } from "../utils/error.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash
    });
    await newUser.save();
    res.status(201).json("User has been created");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User Not Found!"));

    // if (!user) {
    //   //   const err = new Error();
    //   //   err.status = 401;
    //   //   err.message = "User Not Found";
    //   //   return next(err);
    //   return next(createError(404, "User Not Found!"));
    // }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Username or Password is incorrect"));

    // not send some data
    const { password, isAdmin, ...otherData } = user._doc;

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    // res.status(201).json({ ...otherData });
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(201)
      .json({ ...otherData });
  } catch (error) {
    next(error);
  }
};
