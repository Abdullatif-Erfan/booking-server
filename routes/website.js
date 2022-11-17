import express from "express";
import { createWebsiteContent, deleteWebsiteContent, getWebsiteContent, updateWebsiteContent } from "../controllers/website.js";
const router = express.Router();

router.post("/", createWebsiteContent);
router.put("/:id", updateWebsiteContent);
router.delete('/:id', deleteWebsiteContent);
router.get("/", getWebsiteContent);


export default router;
