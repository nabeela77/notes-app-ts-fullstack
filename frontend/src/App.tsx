import { useState, useEffect, use } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import {
  getAllNotes,
  // getNoteById,
  deleteNote as apiDeleteNote,
  updateNote as apiUpdateNote,
  createNote as apiCreateNote,
} from "./api/api";
import FilterImportant from "./components/FilterImportant";
interface Note {
  id: string;
  content: string;
  date: string;
  important: boolean;
}
const getCurrentDate = () => new Date().toLocaleString();

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showMode, setShowMode] = useState<"all" | "important">("all");
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes(); //.then(() => setLoading(false));
  }, []);
  // if (loading) return <div>Loading notes...</div>;
  const fetchNotes = async () => {
    try {
      const data = await getAllNotes();
      setNotes(data);
    } catch (err) {
      console.log(err, "error fetching all notes");
    }
  };

  // const addNote  = async (content: string, important: boolean) => {
  //   const newNote: Note = {
  //     id: Math.random().toString(36).slice(2),
  //     content,
  //     date: getCurrentDate(),
  //     important,
  //   };
  //   setNotes((prev) => [...prev, newNote]);
  // };
  const addNote = async (content: string, important: boolean) => {
    try {
      const createdNote = await apiCreateNote({ content, important });
      setNotes((prev) => [...prev, createdNote]);
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  // const deleteNote = (id: string) => {
  //   setNotes((prev) => prev.filter((n) => n.id !== id));
  // };
  const handleDeleteNote = async (id: string) => {
    try {
      await apiDeleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  // const toggleImportant = (id: string) => {
  //   setNotes((prev) =>
  //     prev.map((n) => (n.id === id ? { ...n, important: !n.important } : n))
  //   );
  // };

  const toggleImportant = async (id: string) => {
    try {
      const noteToToggle = notes.find((n) => n.id === id);
      if (!noteToToggle) return;

      const updatedNote = {
        ...noteToToggle,
        important: !noteToToggle.important,
      };

      const savedNote = await apiUpdateNote(id, updatedNote);
      setNotes((prev) => prev.map((n) => (n.id === id ? savedNote : n)));
    } catch (error) {
      console.error("Failed to toggle importance:", error);
    }
  };

  // const editNote = (id: string, newContent: string) => {
  //   setNotes((prev) =>
  //     prev.map((n) =>
  //       n.id === id ? { ...n, content: newContent, date: getCurrentDate() } : n
  //     )
  //   );
  // };

  const editNote = async (id: string, newContent: string) => {
    try {
      const noteToEdit = notes.find((n) => n.id === id);
      if (!noteToEdit) return;

      const updatedNote = {
        ...noteToEdit,
        content: newContent,
        date: getCurrentDate(),
      };

      const savedNote = await apiUpdateNote(id, updatedNote);
      setNotes((prev) => prev.map((n) => (n.id === id ? savedNote : n)));
    } catch (error) {
      console.error("Failed to edit note:", error);
    }
  };
  const filteredNotes =
    showMode === "all" ? notes : notes.filter((n) => n.important);

  return (
    <div className="app-container">
      <h1>Notes App</h1>
      <FilterImportant showMode={showMode} setShowMode={setShowMode} />
      <NoteForm onSubmit={addNote} />
      <NoteList
        notes={filteredNotes}
        onDelete={handleDeleteNote}
        onToggleImportant={toggleImportant}
        onEdit={editNote}
      />
    </div>
  );
}
