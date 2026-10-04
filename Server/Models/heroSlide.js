import mongoose from "mongoose";

const heroSlideSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true },
      si: { type: String, required: true },
    },
    subtitle: {
      en: { type: String, default: "" },
      si: { type: String, default: "" },
    },
    buttonText: {
      en: { type: String, default: "" },
      si: { type: String, default: "" },
    },
    buttonLink: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      default: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const heroSlide = mongoose.model("heroSlide", heroSlideSchema);

export default heroSlide;
