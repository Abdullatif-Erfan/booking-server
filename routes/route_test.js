import express from "express";
import { controllerRoute } from "../controllers/test.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json("Route Test is working");
});

router.get("/controller_route", controllerRoute);

export default router;
