import NoteItem from "./NoteItem";
import "./NoteList.css";

interface Note {
  id: string;
  content: string;
  date: string;
  important: boolean;
}

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
  onToggleImportant: (id: string) => void;
  onEdit: (id: string, content: string) => void;
}

export default function NoteList({
  notes,
  onDelete,
  onToggleImportant,
  onEdit,
}: NoteListProps) {
  if (notes.length === 0) return <div>No notes found.</div>;

  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onToggleImportant={onToggleImportant}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
