import { validationResult } from "express-validator";

const result = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const err = new Error("Validation failed");
    err.statusCode = 422;
    err.data = error.array();
    next(err);
  }
  next();
};

export default {
  result,
};
