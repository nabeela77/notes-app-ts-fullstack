import React, { useState } from "react";
import "./NoteForm.css";

interface NoteFormProps {
  onSubmit: (content: string, important: boolean) => void;
}

export default function NoteForm({ onSubmit }: NoteFormProps) {
  const [content, setContent] = useState("");
  const [important, setImportant] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (content.trim() === "") return;
    onSubmit(content, important);
    setContent("");
    setImportant(false);
  }

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter note content"
        required
      />
      <label>
        <input
          type="checkbox"
          checked={important}
          onChange={(e) => setImportant(e.target.checked)}
        />{" "}
        Important
      </label>
      <button>Add Note</button>
    </form>
  );
}
