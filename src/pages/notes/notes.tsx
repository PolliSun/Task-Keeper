import { FC } from "react";
import { NoteHeader } from "../../components/note-header/note-header";
import { NoteList } from "../../components/note-list/note-list";

export const Notes: FC = () => {
  return (
    <main >
      <NoteHeader />
      <NoteList />
    </main>
  );
};
