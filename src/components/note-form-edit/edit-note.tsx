import { FC } from "react";
import { NoteFormUI } from "../ui/note-form/note-form";
import { TNote } from "../../types/type";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector, RootState } from "../../services/store";
import { editNote } from "../../services/slices/notesSlice";

export const EditNote: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteToEdit = useSelector((state: RootState) =>
    state.notes.notes.find((note) => note.id === id)
  );

  const handleEditNote = (updatedNote: TNote) => {
    dispatch(editNote(updatedNote));
    navigate(-1);
  };

  return <NoteFormUI onSubmit={handleEditNote} initialData={noteToEdit} />;
};
