import { FC } from "react";
import { useDispatch } from "../../services/store";
import { pinNote } from "../../services/slices/notesSlice";
import { NoteCardUI } from "../ui/note-card/note-card";
import { TNote } from "../../types/type";

type TNoteCardProps = {
  note: TNote;
};

export const NoteCard: FC<TNoteCardProps> = ({ note }) => {
  const dispatch = useDispatch();

  const handlePinNote = () => {
    dispatch(pinNote(note.id));
  };

  return <NoteCardUI note={note} onPin={handlePinNote} />;
};
