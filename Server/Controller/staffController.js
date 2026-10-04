import Staff from "../Models/staff.js";
import { handleError } from "../Middleware/errorHandler.js";
import { deleteImage } from "../Config/cloudinary.js";

export const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find({ isActive: true }).sort({ order: 1 });
    res.json(staff);
  } catch (error) {
    handleError(res, error);
  }
};

export const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find().sort({ order: 1 });
    res.json(staff);
  } catch (error) {
    handleError(res, error);
  }
};

export const createStaff = async (req, res) => {
  try {
    const {
      name_en,
      name_si,
      position_en,
      position_si,
      email,
      phone,
      bio_en,
      bio_si,
      order,
      isActive,
    } = req.body;

    // New
    const photo = req.file ? req.file.path : "";

    const staff = await Staff.create({
      name: {
        en: name_en,
        si: name_si,
      },
      position: {
        en: position_en,
        si: position_si,
      },
      email,
      phone,
      bio: {
        en: bio_en || "",
        si: bio_si || "",
      },
      order: Number(order) || 0,
      isActive: isActive === "true" || isActive === true,
      photo,
    });

    res.status(201).json(staff);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    const {
      name_en,
      name_si,
      position_en,
      position_si,
      email,
      phone,
      bio_en,
      bio_si,
      order,
      isActive,
    } = req.body;

    staff.name = {
      en: name_en ?? staff.name.en,
      si: name_si ?? staff.name.si,
    };

    staff.position = {
      en: position_en ?? staff.position.en,
      si: position_si ?? staff.position.si,
    };

    staff.bio = {
      en: bio_en ?? staff.bio.en,
      si: bio_si ?? staff.bio.si,
    };

    staff.email = email ?? staff.email;
    staff.phone = phone ?? staff.phone;
    staff.order = order !== undefined ? Number(order) : staff.order;
    staff.isActive =
      isActive !== undefined
        ? isActive === "true" || isActive === true
        : staff.isActive;

    const oldPhoto = staff.photo;
    if (req.file) {
      staff.photo = req.file.path;
    }

    const updatedStaff = await staff.save();

    if (req.file) {
      await deleteImage(oldPhoto);
    }

    res.json(updatedStaff);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    await staff.deleteOne();
    await deleteImage(staff.photo);
    res.json({ message: "Staff deleted" });
  } catch (error) {
    handleError(res, error);
  }
};
