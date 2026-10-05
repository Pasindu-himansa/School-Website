import mongoose from "mongoose";
import dns from "dns";

const RETRY_DELAY_MS = 5000;

// Keeps trying until MongoDB answers instead of exiting: a free Atlas
// cluster can take a while to wake up, and nodemon won't restart a crashed
// app on its own, so one slow start used to leave the API down.
const connectDB = async () => {
  // Node on this machine reports 127.0.0.1 as its DNS server, which can't
  // look up the Atlas cluster address, so use public DNS instead.
  dns.setServers(["8.8.8.8", "1.1.1.1"]);

  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not set in Server/.env");
    process.exit(1);
  }

  for (let attempt = 1; ; attempt++) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB connected");
      return;
    } catch (error) {
      console.error(
        `Database connection failed (attempt ${attempt}): ${error.message}`,
      );
      console.error(`Retrying in ${RETRY_DELAY_MS / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
};

export default connectDB;
