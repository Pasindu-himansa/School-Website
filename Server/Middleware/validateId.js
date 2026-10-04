// Used with router.param("id", validateId) so a malformed id is a 404
// instead of a Mongoose CastError 500.
export const validateId = (req, res, next, id) => {
  if (!/^[a-f\d]{24}$/i.test(id)) {
    return res.status(404).json({ message: "Not found" });
  }

  next();
};
