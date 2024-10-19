import { FC } from "react";
import styles from "./note-list.module.css";
import { NoteCard } from "../../note-card/note-card";
import { TNote } from "../../../types/type";

type NotesListUIProps = {
  notes: TNote[];
};

export const NoteListUI: FC<NotesListUIProps> = ({ notes }) => {
  return (
    <>
      <section className={styles.content}>
        <div className={styles.notebookHolesTop}>
          {[...Array(7)].map((_, index) => (
            <div key={index} className={styles.hole} />
          ))}
        </div>
        <ul className={styles.notes}>
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </ul>
      </section>
    </>
  );
};
