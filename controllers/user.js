import User from "../models/User.js";
import { createError } from "../utils/error.js";

/**
 * @route   PUT users
 * @desc    update a user
 * @access  Public
 */
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ); // new:true => return updated record
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   delet users
 * @desc    delete a user
 * @access  Public
 */
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User Deleted Successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET a user
 * @desc    get a user
 * @access  Public
 */
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET users
 * @desc    get all user
 * @access  Public
 */
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
