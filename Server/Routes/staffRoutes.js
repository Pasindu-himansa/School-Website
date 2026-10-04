import express from "express";
import { protect } from "../Middleware/protect.js";
import upload from "../Middleware/upload.js";
import { validateId } from "../Middleware/validateId.js";
import {
  getStaff,
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
} from "../Controller/staffController.js";

const router = express.Router();

router.param("id", validateId);

router.get("/", getStaff);
router.get("/admin", protect, getAllStaff);

router.post("/", protect, upload.single("photo"), createStaff);
router.put("/:id", protect, upload.single("photo"), updateStaff);
router.delete("/:id", protect, deleteStaff);

export default router;
