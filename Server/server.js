import "./Config/env.js"; // must be first

import express from "express";
import cors from "cors";
import connectDB from "./Config/db.js";
import authRoutes from "./Routes/authRoutes.js";
import heroRoutes from "./Routes/heroRoutes.js";
import staffRoutes from "./Routes/staffRoutes.js";
import notificationRoutes from "./Routes/notificationRoutes.js";
import messageRoutes from "./Routes/messageRoutes.js";
import { errorHandler } from "./Middleware/errorHandler.js";

const app = express();

// Behind a host's proxy (Render, Railway...) set TRUST_PROXY=1 so the
// rate limiters see each visitor's IP instead of the proxy's.
if (process.env.TRUST_PROXY) {
  app.set("trust proxy", Number(process.env.TRUST_PROXY));
}

// Only our own frontend may call the API. CLIENT_URL can list several
// origins separated by commas.
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5174")
  .split(",")
  .map((origin) => origin.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("School Website API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/messages", messageRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

// don't accept requests until the database is reachable
await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
