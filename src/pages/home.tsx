import React from "react";
import { useEffect } from "react";
import { NoteList } from "../components/NoteList/NoteList";
import { getNotesFromStorage, saveNotesToStorage } from "../utils/noteStorage";
import { useDispatch, useSelector } from "../services/store";
import { deleteNote, setNotes } from "../services/slices/notesSlice";

export const Home: React.FC = () => {
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedNotes = getNotesFromStorage();
    dispatch(setNotes(savedNotes));
  }, [dispatch]);

  const handleDeleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    dispatch(deleteNote(id));
    saveNotesToStorage(updatedNotes);
  };

  return (
    <div>
      <NoteList notes={notes} onDelete={handleDeleteNote} />
    </div>
  );
};
