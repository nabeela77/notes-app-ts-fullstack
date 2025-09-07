import { Request, Response, NextFunction } from "express";
import { NoteModel } from "../models/note";

// GET /api/notes
export async function getAllNotes(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const docs = await NoteModel.find().sort({ date: -1 });
    console.log(docs);
    res.json(docs);
  } catch (err) {
    next(err);
  }
}

// GET /api/notes/:id
export async function getNoteById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const doc = await NoteModel.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Note not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/notes/:id
export async function deleteNote(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const doc = await NoteModel.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: "Note not found" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

// POST /api/notes
export async function createNote(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { content, important } = req.body ?? {};
    if (!content || typeof content !== "string") {
      return res.status(404).json({ error: "Content is required" });
    }
    const doc = await NoteModel.create({
      content,
      important,
      date: new Date(),
    });
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
}

// PUT /api/notes/:id

export async function updateNote(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const doc = await NoteModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!doc) return res.status(404).json({ error: "Note not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
}
