import multer from "multer";

// For controller catch blocks: bad input is a 400 the admin can act on,
// anything else is logged and hidden behind a generic 500.
export const handleError = (res, error) => {
  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({ message: error.message });
  }

  console.error(error);
  res.status(500).json({ message: "Something went wrong, please try again" });
};

// Errors thrown before a controller runs (multer / Cloudinary upload)
export const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    const message =
      err.code === "LIMIT_FILE_SIZE"
        ? "Image must be 5 MB or smaller"
        : err.message;
    return res.status(400).json({ message });
  }

  // Cloudinary rejects unsupported formats with http_code 400
  if (err.http_code === 400) {
    return res.status(400).json({ message: err.message });
  }

  handleError(res, err);
};
