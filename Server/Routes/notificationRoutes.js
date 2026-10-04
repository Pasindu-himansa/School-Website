import express from "express";
import {
  getPublishedNotifications,
  getSpecialNotifications,
  getSingleNotification,
  getAllNotificationsAdmin,
  createNotification,
  updateNotification,
  deleteNotification,
} from "../Controller/notificationController.js";
import { protect } from "../Middleware/protect.js";
import { validateId } from "../Middleware/validateId.js";

const router = express.Router();

router.param("id", validateId);

// public
router.get("/", getPublishedNotifications);
router.get("/special", getSpecialNotifications);
router.get("/:id", getSingleNotification);

// admin
router.get("/admin/all", protect, getAllNotificationsAdmin);
router.post("/", protect, createNotification);
router.put("/:id", protect, updateNotification);
router.delete("/:id", protect, deleteNotification);

export default router;
