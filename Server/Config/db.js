import mongoose from "mongoose";
import dns from "dns";

const connectDB = async () => {
  // Node on this machine reports 127.0.0.1 as its DNS server, which can't
  // look up the Atlas cluster address, so use public DNS instead.
  dns.setServers(["8.8.8.8", "1.1.1.1"]);

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
