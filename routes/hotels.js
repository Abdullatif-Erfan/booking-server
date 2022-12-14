import express from "express";
import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
  countByCity,
  countByType,
  getHotelRooms
} from "../controllers/hotel.js";
// import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// router.post("/", verifyAdmin, createHotel);
// router.put("/:id", verifyAdmin, updateHotel);
// router.delete("/:id", verifyAdmin, deleteHotel);
router.post("/", createHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);
router.get("/find/:id", getHotel);
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;
