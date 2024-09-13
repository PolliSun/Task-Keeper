import React from "react";
import { useEffect, useState } from "react";
import { NoteList } from "../components/NoteList";
import { TNote } from "../types/type";
import { getNotesFromStorage, saveNotesToStorage } from "../utils/noteStorage";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const [notes, setNotes] = useState<TNote[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedNotes = getNotesFromStorage();
    setNotes(savedNotes);
  }, []);

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    saveNotesToStorage(updatedNotes);
  };

  const handleCreateNote = () => {
    navigate("/create");
  };

  return (
    <div>
      <h1>Note Keeper</h1>
      <button onClick={handleCreateNote}>Добавить заметку</button>
      <NoteList notes={notes} onDelete={deleteNote} />
    </div>
  );
};
