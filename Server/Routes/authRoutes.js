import express from "express";
import { registerAdmin, loginAdmin } from "../Controller/authController.js";
import { protect } from "../Middleware/protect.js";
import { loginLimiter } from "../Middleware/rateLimit.js";

const router = express.Router();

// only a logged-in admin can create another admin
router.post("/register", protect, registerAdmin);
router.post("/login", loginLimiter, loginAdmin);

export default router;
