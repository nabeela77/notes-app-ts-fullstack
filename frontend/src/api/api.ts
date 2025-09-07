import axios from "axios";

export const API_URL = "http://localhost:4000/api/notes";
export interface NoteAPI {
  id: string;
  content: string;
  date: string;
  important: boolean;
}

export async function getAllNotes(): Promise<NoteAPI[]> {
  const res = await axios.get(API_URL);
  return res.data;
}

export async function getNoteById(id: string): Promise<NoteAPI> {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
}

export async function deleteNote(id: string): Promise<NoteAPI> {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
}

export async function createNote(note: {
  content: string;
  important: boolean;
}): Promise<NoteAPI> {
  const res = await axios.post(API_URL, note);
  return res.data;
}

export async function updateNote(
  id: string,
  note: { content: string; important: boolean }
): Promise<NoteAPI> {
  const res = await axios.put(`${API_URL}/${id}`, note);
  return res.data;
}
