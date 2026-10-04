import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true },
      si: { type: String, required: true },
    },
    position: {
      en: { type: String, required: true },
      si: { type: String, required: true },
    },
    photo: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    bio: {
      en: { type: String, default: "" },
      si: { type: String, default: "" },
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
