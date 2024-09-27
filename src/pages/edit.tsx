import React from "react";
import { NoteForm } from "../components/NoteForm/NoteForm";
import { TNote } from "../types/type";
import { saveNotesToStorage, getNotesFromStorage } from "../utils/noteStorage";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "../services/store";
import { editNote } from "../services/slices/notesSlice";

export const EditNote: React.FC = () => {
  const { id } = useParams();
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteToEdit = notes.find((note) => note.id === id);

  const handleEditNote = (updatedNote: TNote) => {
    dispatch(editNote(updatedNote));
    const savedNotes = getNotesFromStorage();
    const updatedNotes = savedNotes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    saveNotesToStorage(updatedNotes);
    navigate("/notes");
  };

  return <NoteForm onSubmit={handleEditNote} initialData={noteToEdit} />;
};
