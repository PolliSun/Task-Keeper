import { FC } from "react";
import { NoteFormUI } from "../ui/note-form/note-form";
import { TNote } from "../../types/type";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "../../services/store";
import { addNote } from "../../services/slices/notesSlice";

export const CreateNote: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSaveNote = (newNote: TNote) => {
    dispatch(addNote(newNote));
    navigate("/notes-page");
  };

  return <NoteFormUI onSubmit={handleSaveNote} />;
};
