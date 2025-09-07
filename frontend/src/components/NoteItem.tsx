import { useState } from "react";
interface Note {
  id: string;
  content: string;
  date: string;
  important: boolean;
}

interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
  onToggleImportant: (id: string) => void;
  onEdit: (id: string, content: string) => void;
}

export default function NoteItem({
  note,
  onDelete,
  onToggleImportant,
  onEdit,
}: NoteItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(note.content);
  const handleSave = () => {
    if (editedContent.trim() === "") return;
    onEdit(note.id, editedContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(note.content);
    setIsEditing(false);
  };

  return (
    <div className="note-item">
      {isEditing ? (
        <>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={3}
          />
          <div className="note-item-buttons">
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </>
      ) : (
        <>
          <div>{note.content}</div>
          <div>
            <small>{note.date}</small>
          </div>
          <div className="note-item-buttons">
            <button onClick={() => onDelete(note.id)}>Delete</button>
            <button onClick={() => onToggleImportant(note.id)}>
              {note.important ? "Unmark Important" : "Mark Important"}
            </button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        </>
      )}
    </div>
  );
}

import "./NoteItem.css";
