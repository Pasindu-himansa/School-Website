import HeroSlide from "../Models/heroSlide.js";
import { handleError } from "../Middleware/errorHandler.js";
import { deleteImage } from "../Config/cloudinary.js";

export const getHeroSlides = async (req, res) => {
  try {
    const slides = await HeroSlide.find({ isActive: true }).sort({ order: 1 });
    res.status(200).json(slides);
  } catch (error) {
    handleError(res, error);
  }
};

export const getAllHeroSlides = async (req, res) => {
  try {
    const slides = await HeroSlide.find().sort({ order: 1 });
    res.status(200).json(slides);
  } catch (error) {
    handleError(res, error);
  }
};

export const createHeroSlide = async (req, res) => {
  try {
    const {
      title_en,
      title_si,
      subtitle_en,
      subtitle_si,
      buttonText_en,
      buttonText_si,
      buttonLink,
      order,
      isActive,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Please choose a slide image" });
    }

    const slide = await HeroSlide.create({
      title: {
        en: title_en,
        si: title_si,
      },
      subtitle: {
        en: subtitle_en || "",
        si: subtitle_si || "",
      },
      buttonText: {
        en: buttonText_en || "",
        si: buttonText_si || "",
      },
      buttonLink,
      imageUrl: req.file?.path,
      order: Number(order) || 1,
      isActive: isActive === "true" || isActive === true,
    });

    res.status(201).json(slide);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateHeroSlide = async (req, res) => {
  try {
    const slide = await HeroSlide.findById(req.params.id);

    if (!slide) {
      return res.status(404).json({ message: "Slide not found" });
    }

    const {
      title_en,
      title_si,
      subtitle_en,
      subtitle_si,
      buttonText_en,
      buttonText_si,
      buttonLink,
      order,
      isActive,
    } = req.body;

    slide.title = {
      en: title_en ?? slide.title.en,
      si: title_si ?? slide.title.si,
    };

    slide.subtitle = {
      en: subtitle_en ?? slide.subtitle.en,
      si: subtitle_si ?? slide.subtitle.si,
    };

    slide.buttonText = {
      en: buttonText_en ?? slide.buttonText.en,
      si: buttonText_si ?? slide.buttonText.si,
    };

    slide.buttonLink = buttonLink ?? slide.buttonLink;
    const oldImageUrl = slide.imageUrl;
    if (req.file) {
      slide.imageUrl = req.file.path;
    }
    slide.order = order !== undefined ? Number(order) : slide.order;
    slide.isActive =
      isActive !== undefined
        ? isActive === "true" || isActive === true
        : slide.isActive;

    const updatedSlide = await slide.save();

    if (req.file) {
      await deleteImage(oldImageUrl);
    }

    res.status(200).json(updatedSlide);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteHeroSlide = async (req, res) => {
  try {
    const slide = await HeroSlide.findById(req.params.id);

    if (!slide) {
      return res.status(404).json({ message: "Slide not found" });
    }

    await slide.deleteOne();
    await deleteImage(slide.imageUrl);
    res.status(200).json({ message: "Slide deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
};
