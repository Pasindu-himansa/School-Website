import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true },
      si: { type: String, required: true },
    },
    content: {
      en: { type: String, required: true },
      si: { type: String, required: true },
    },
    summary: {
      en: { type: String, default: "" },
      si: { type: String, default: "" },
    },
    imageUrl: {
      type: String,
      default: "",
    },
    category: {
      en: { type: String, default: "General" },
      si: { type: String, default: "සාමාන්‍ය" },
    },
    isSpecial: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
