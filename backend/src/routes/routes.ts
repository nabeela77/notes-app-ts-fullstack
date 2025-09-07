import { Router } from "express";
import {
  createNote,
  getAllNotes,
  getNoteById,
  deleteNote,
  updateNote,
} from "../controllers/notes";

const router = Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
