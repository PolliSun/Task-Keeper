import { FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/store";
import { deleteNote, pinNote } from "../../services/slices/notesSlice";
import { NoteDetailsUI } from "../ui/note-details/note-details";

export const NoteDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const note = useSelector((state) =>
    state.notes.notes.find((note) => note.id === id)
  );

  const handleDeleteNote = () => {
    if (note) {
      dispatch(deleteNote(note.id));
      navigate("/notes-page");
    }
  };

  const handlePinNote = () => {
    if (note) {
      dispatch(pinNote(note.id));
    }
  };

  const handleEditNote = () => {
    if (note) {
      navigate(`/notes-page/edit-note/${note.id}`, {
        state: { background: "/notes-page" },
      });
    }
  };

  if (!note) {
    return <div>Заметка не найдена</div>;
  }

  return (
    <NoteDetailsUI
      note={note}
      onDelete={handleDeleteNote}
      onPin={handlePinNote}
      onEdit={handleEditNote}
    />
  );
};
