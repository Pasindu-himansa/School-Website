import express from "express";
import {
  createMessage,
  getMessages,
  deleteMessage,
} from "../Controller/messageController.js";
import { protect } from "../Middleware/protect.js";
import { messageLimiter } from "../Middleware/rateLimit.js";
import { validateId } from "../Middleware/validateId.js";

const router = express.Router();

router.param("id", validateId);

// public
router.post("/", messageLimiter, createMessage);

// admin
router.get("/", protect, getMessages);
router.delete("/:id", protect, deleteMessage);

export default router;
