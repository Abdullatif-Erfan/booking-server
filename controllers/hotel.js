import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import Room from "../models/Room.js";

/**
 * @route   POST hotels
 * @desc    create a hotel
 * @access  Public
 */
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT hotels
 * @desc    update a hotel
 * @access  Public
 */
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ); // new:true => return updated record
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   delet hotels
 * @desc    delete a hotel
 * @access  Public
 */
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel Deleted Successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET  hotels/find/id
 * @desc    get a hotel
 * @access  Public
 */
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET hotels
 * @desc    get all hotel
 * @access  Public
 */
export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    // const hotels = await Hotel.find();
    // const hotels = await Hotel.find(req.query).limit(req.query.limit);
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gte: min || 1, $lte: max || 1000 }
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET hotels/countByCity?cities=berlin,London,Kabul
 * @desc    get all hotel
 * @access  Public
 */
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map(city => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

/**
 * @route      GET hotels/countByType
 * @desc       get countByType
 * @access     Public
 */
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    res
      .status(200)
      .json([
        { type: "hotel", count: hotelCount },
        { type: "apartment", count: apartmentCount },
        { type: "resort", count: resortCount },
        { type: "villa", count: villaCount },
        { type: "cabin", count: cabinCount }
      ]);
  } catch (err) {
    next(err);
  }
};

/**
 * @route      GET hotels/room/id
 * @desc       get hotel rooms
 * @access     Public
 */
export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map(room => {
        return Room.findById(room);
      })
    );
    return res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
