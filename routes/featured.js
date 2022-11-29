import express from "express";
import { addFeatured } from "../controllers/featured.js";
const router = express.Router();

router.post("/:id", addFeatured);
export default router;
