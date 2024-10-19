import { FC } from "react";
import { NoteListUI } from "../../notes-list/note-list";
import { NoteHeaderUI } from "../../note-header/note-header";
import styles from "./notes-page.module.css";
import { TNote } from "../../../../types/type";

type NotesPageProps = {
  notes: TNote[];
};

export const NotesPage: FC<NotesPageProps> = ({ notes }) => {
  return (
    <main className={styles.page}>
      <NoteHeaderUI />
      <NoteListUI notes={notes} />
    </main>
  );
};
