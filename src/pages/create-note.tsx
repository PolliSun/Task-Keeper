import React, { FC } from "react";
import { NoteForm } from "../components/note-form/note-form";
import { TNote } from "../types/type";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "../services/store";
import { addNote } from "../services/slices/notesSlice";
import { RootState, useSelector } from "../services/store";

export const CreateNote: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSaveNote = (newNote: TNote) => {
    dispatch(addNote(newNote));
    navigate("/notes-page");
  };

  return <NoteForm onSubmit={handleSaveNote} />;
};
