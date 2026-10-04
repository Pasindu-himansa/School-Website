import Notification from "../Models/notification.js";
import { handleError } from "../Middleware/errorHandler.js";

// public
export const getPublishedNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ isPublished: true }).sort({
      createdAt: -1,
    });
    res.status(200).json(notifications);
  } catch (error) {
    handleError(res, error);
  }
};

export const getSpecialNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      isPublished: true,
      isSpecial: true,
    }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    handleError(res, error);
  }
};

export const getSingleNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification || !notification.isPublished) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json(notification);
  } catch (error) {
    handleError(res, error);
  }
};

// admin
export const getAllNotificationsAdmin = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    handleError(res, error);
  }
};

export const createNotification = async (req, res) => {
  try {
    const {
      title_en,
      title_si,
      summary_en,
      summary_si,
      content_en,
      content_si,
      imageUrl,
      category_en,
      category_si,
      isSpecial,
      isPublished,
    } = req.body;

    const notification = await Notification.create({
      title: {
        en: title_en,
        si: title_si,
      },
      summary: {
        en: summary_en || "",
        si: summary_si || "",
      },
      content: {
        en: content_en,
        si: content_si,
      },
      imageUrl,
      category: {
        en: category_en || "General",
        si: category_si || "සාමාන්‍ය",
      },
      isSpecial: isSpecial === "true" || isSpecial === true,
      isPublished: isPublished === "true" || isPublished === true,
    });

    res.status(201).json(notification);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    const {
      title_en,
      title_si,
      summary_en,
      summary_si,
      content_en,
      content_si,
      imageUrl,
      category_en,
      category_si,
      isSpecial,
      isPublished,
    } = req.body;

    notification.title = {
      en: title_en ?? notification.title.en,
      si: title_si ?? notification.title.si,
    };

    notification.summary = {
      en: summary_en ?? notification.summary.en,
      si: summary_si ?? notification.summary.si,
    };

    notification.content = {
      en: content_en ?? notification.content.en,
      si: content_si ?? notification.content.si,
    };

    notification.category = {
      en: category_en ?? notification.category.en,
      si: category_si ?? notification.category.si,
    };

    notification.imageUrl = imageUrl ?? notification.imageUrl;
    notification.isSpecial =
      isSpecial !== undefined
        ? isSpecial === "true" || isSpecial === true
        : notification.isSpecial;

    notification.isPublished =
      isPublished !== undefined
        ? isPublished === "true" || isPublished === true
        : notification.isPublished;

    const updatedNotification = await notification.save();
    res.status(200).json(updatedNotification);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    await notification.deleteOne();
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
};
