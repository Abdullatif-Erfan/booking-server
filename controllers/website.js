import Website from "../models/Website.js";
import { createError } from "../utils/error.js";

/**
 * @route   POST website
 * @desc    get website records
 * @access  
 */
 export const createWebsiteContent = async (req, res, next) => {
  const newRecord = new Website(req.body);
  try {
    const savedRecord = await newRecord.save();
    res.status(200).json(savedRecord);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT website/id
 * @desc    update 
 * @access  Public
 */
export const updateWebsiteContent = async (req, res, next) => {
  try {
    const updatedRecord = await Website.findByIdAndUpdate(
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
 * @route   delete website/id
 * @desc    delete 
 * @access  Public
 */
 export const deleteWebsiteContent = async (req, res, next) => {
  try {
    const deletedRecord = await Website.findByIdAndDelete(req.params.id);
    res.status(200).json("Data Deleted Successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET website?websiteName=techzone&postType=services
 * @desc    get 
 * @access  Public
 */
export const getWebsiteContent = async (req, res, next) => {
  try {
    const record = await Website.find(req.query);
    res.status(200).json(record);
  } catch (error) {
    next(error);
  }
};
