import React, { FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NoteDetailsUI } from "../components/note-details/note-details";
import { useDispatch, useSelector, RootState } from "../services/store";
import { deleteNote } from "../services/slices/notesSlice";

export const NoteDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedNote = useSelector((state: RootState) =>
    state.notes.notes.find((note) => note.id === id)
  );

  const handleDeleteNote = (id: string) => {
    dispatch(deleteNote(id));
    navigate("/notes-page");
  };

  if (!selectedNote) {
    return null;
  }

  return (
    <div>
      <NoteDetailsUI note={selectedNote} onDelete={handleDeleteNote} />
    </div>
  );
};
