import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

/**
 * @route      GET featured/id
 * @desc       insert hotel featured
 * @access     Public
 */
export const addFeatured = async (req, res, next) => {
  const hotelId = req.params.id;
  try {
    // const hotel = await Hotel.findById(req.params.id);
    // if (!hotel) return next(createError(404, "Hotel Not Found"));
    await Hotel.findByIdAndUpdate(hotelId, {
      $push: { featuredDetails: req.body }
    });
    const hotel = await Hotel.findById(hotelId);
    res.status(200).json(hotel);
    // res.status(200).json('Featured Details added Successfull');
  } catch (err) {
    next(err);
  }
};
