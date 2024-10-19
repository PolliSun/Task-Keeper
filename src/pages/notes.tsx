import { FC } from "react";
import { NotesPage } from "../components/ui/pages/notes-page/notes-page";
import { RootState, useSelector } from "../services/store";

export const Notes: FC = () => {
  const notes = useSelector((state: RootState) => state.notes.notes);

  return <NotesPage notes={notes}/>;
};
