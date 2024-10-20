import { FC } from "react";
import { NoteHeader } from "../../components/note-header/note-header";
import { NoteList } from "../../components/note-list/note-list";
import styles from "./notes.module.css";

export const Notes: FC = () => {
  return (
    <main className={styles.page}>
      <NoteHeader />
      <NoteList />
    </main>
  );
};
