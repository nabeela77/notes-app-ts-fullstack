import express from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import notesRouter from "./routes/routes";

export const app = express();

app.use(cors());
app.use(express.json());

// // Serve frontend build
const frontendPath = path.join(__dirname, "../public");
app.use(express.static(frontendPath));

//Health Check
app.get("/health", (req, res) => {
  // check if database connection is working
  const mongoState = mongoose.connection.readyState;
  res.json({
    status: "ok",
    mongo: mongoState === 1 ? "connected" : "not-connected",
  });
  // res.json
});

// API Routes
app.use("/api/notes", notesRouter);

// SPA fallback (for React Router)
app.get(/.*/, (_req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

//404
app.use((req, res, next) => {
  res.status(404).json({ error: "endpoint not found" });
});

// error handler

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  if (err?.name === "CastError")
    return res.status(400).json({ error: "malformed id" });
  if (err?.name === "ValidationError")
    return res.status(400).json({ error: err.message });

  res.status(500).json({ error: "Internal server errors" });
});
