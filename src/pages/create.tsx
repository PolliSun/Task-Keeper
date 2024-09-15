import React from "react";
import { NoteForm } from "../components/NoteForm";
import { TNote } from "../types/type";
import { saveNotesToStorage, getNotesFromStorage } from "../utils/noteStorage";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "../services/store";
import { addNote } from '../services/slices/notesSlice';

export const CreateNote: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSaveNote = (newNote: TNote) => {
    dispatch(addNote(newNote));
    const savedNotes = getNotesFromStorage();
    saveNotesToStorage([...savedNotes, newNote]);
    navigate('/');
  };

  return (
    <NoteForm onSubmit={handleSaveNote} />
  );
};
