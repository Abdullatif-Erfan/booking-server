import Akams from "../models/Akam.js";
import { createError } from "../utils/error.js";
import { rejects } from "assert";

/**
 * @route   POST Akam Data
 * @desc    get Akam records
 * @access
 */
export const createAkamContent = async (req, res, next) => {
  const newRecord = new Akams(req.body);
  try {
    const savedRecord = await newRecord.save();
    res.status(200).json(savedRecord);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT akams/id
 * @desc    update
 * @access  Public
 */
export const updateAkamsContent = async (req, res, next) => {
  try {
    const updatedRecord = await Akams.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRecord);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   delete akams/id
 * @desc    delete
 * @access  Public
 */
export const deleteAkamContent = async (req, res, next) => {
  try {
    const deletedRecord = await Akams.findByIdAndDelete(req.params.id);
    res.status(200).json("Data Deleted Successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET akams post
 * @desc    get
 * @access  Public
 */
export const getAkamContent = async (req, res, next) => {
  try {
    const record = await Akams.find(req.query);
    res.status(200).json(record);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET akams Post
 * @desc    get Post by Id
 * @access  Public
 */
export const getAkamById = async (req, res, next) => {
  try {
    const record = await Akams.findById(req.params.id);
    res.status(200).json(record);
  } catch (error) {
    next(error);
  }
};
