import { body, param, validationResult } from "express-validator";

const validtion = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
  return;
};

const createNote = [
  body("description")
    .isLength({ min: 3 })
    .withMessage("Description must be at least 3 characters long"),
  validtion,
]

const updateNote = [
  param("id").isMongoId().withMessage("Invalid note id"),
  body("title").isLength({ min: 3 }).withMessage("Title must be at least 3 characters long"),
  body("description")
    .isLength({ min: 3 })
    .withMessage("Description must be at least 3 characters long"),
  body("category").isArray().withMessage("Category must be an array").optional(),
  validtion,
]

export { createNote, updateNote }

