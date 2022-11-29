import express from "express";
import {
  createAkamContent,
  deleteAkamContent,
  getAkamContent,
  updateAkamsContent,
  getAkamById
} from "../controllers/akams.js";
const router = express.Router();

router.post("/", createAkamContent);
router.put("/:id", updateAkamsContent);
router.delete("/:id", deleteAkamContent);
router.get("/", getAkamContent);
router.get("/find/:id", getAkamById);
export default router;
