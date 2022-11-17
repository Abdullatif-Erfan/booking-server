import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

/**
 * @route   POST rooms/hotelid
 * @desc    create a room
 * @access  Private
 */
export const createRoom = async (req, res, next) => {
  /**
   * 1. get hotelId from params
   * 2. create a room
   * 3. udate hotel and add room id
   */
  const hotelid = req.params.hotelid;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    // update hotel and add room id
    try {
      await Hotel.findByIdAndUpdate(hotelid, {
        $push: { rooms: savedRoom._id }
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT rooms/id
 * @desc    update a room
 * @access  Private
 */
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT rooms/availability/id  => room_id
 * @desc    update a room availability
 * @access  Public
 */
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDate": req.body.dates
        }
      }
    );
    res.status(200).json("Room unavailableDate updated successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @route   delete rooms/id/hotelid
 * @desc    delete a room
 * @access  Private
 */
export const deleteRoom = async (req, res, next) => {
  const hotelid = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelid, {
        $pull: { rooms: req.params.id }
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room Deleted Successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET   rooms/id
 * @desc    get a room
 * @access  Public
 */
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET rooms
 * @desc    get all room
 * @access  Public
 */
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};
