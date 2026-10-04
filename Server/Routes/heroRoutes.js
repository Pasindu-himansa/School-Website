import express from "express";
import {
  getHeroSlides,
  getAllHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
} from "../Controller/heroController.js";
import { protect } from "../Middleware/protect.js";
import upload from "../Middleware/upload.js";
import { validateId } from "../Middleware/validateId.js";

const router = express.Router();

router.param("id", validateId);

router.get("/", getHeroSlides);
router.get("/admin", protect, getAllHeroSlides);
router.post("/", protect, upload.single("image"), createHeroSlide);

router.put("/:id", protect, upload.single("image"), updateHeroSlide);
router.delete("/:id", protect, deleteHeroSlide);

export default router;
