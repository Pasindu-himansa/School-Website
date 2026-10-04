import jwt from "jsonwebtoken";
import Admin from "../Models/admin.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // attach admin to request
      req.admin = await Admin.findById(decoded.id).select("-password");

      // reject tokens for deleted admin accounts
      if (!req.admin) {
        return res.status(401).json({
          message: "Not authorized, admin not found",
        });
      }

      // reject tokens issued before the password was last changed
      if (
        req.admin.passwordChangedAt &&
        decoded.iat * 1000 < req.admin.passwordChangedAt.getTime()
      ) {
        return res.status(401).json({
          message: "Not authorized, please log in again",
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Not authorized, token failed",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "Not authorized, no token",
    });
  }
};
