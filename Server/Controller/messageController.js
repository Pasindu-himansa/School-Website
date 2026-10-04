import Message from "../Models/message.js";
import { handleError } from "../Middleware/errorHandler.js";

// public: contact form
export const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    await Message.create({ name, email, message });
    res.status(201).json({ message: "Message sent" });
  } catch (error) {
    handleError(res, error);
  }
};

// admin
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    await message.deleteOne();
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
};
