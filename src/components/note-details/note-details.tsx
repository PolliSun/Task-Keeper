import { FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector, RootState } from "../../services/store";
import { deleteNote, pinNote } from "../../services/slices/notesSlice";
import { NoteDetailsUI } from "../ui/note-details/note-details";

export const NoteDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notes = useSelector((state: RootState) =>
    state.notes.notes.find((note) => note.id === id)
  );

  const handleDeleteNote = (id: string) => {
    dispatch(deleteNote(id));
    navigate("/notes-page");
  };

  const handlePinNote = () => {
    if (notes) {
      dispatch(pinNote(notes.id));
    }
  };

  if (!notes) {
    return null;
  }

  return (
    <NoteDetailsUI
      note={notes}
      isModal={true}
      onDelete={handleDeleteNote}
      onPin={handlePinNote}
    />
  );
};
