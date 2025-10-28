import { Router } from "express";
import * as notesController from "../controller/notes.controller.js";
import * as notesValidator from "../validator/notes.validator.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, notesController.getNotes);

router.post(
  "/create",
  authMiddleware,
  notesValidator.createNote,
  notesController.createNote
);
router.put(
  "/update/:id",
  authMiddleware,
  notesValidator.updateNote,
  notesController.updateNote
);
router.delete("/delete/:id", authMiddleware, notesController.deleteNote);

export default router;
