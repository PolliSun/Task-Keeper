import { FC } from "react";
import { NoteDetailsUI } from "../../note-details/note-details";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./note-pages.module.css";
import { RootState, useSelector } from "../../../../services/store";

export const NotesPageUI: FC = () => {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const location = useLocation();
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/notes-page/create-note", { state: { background: location } });
  };

  return (
    <section className={styles.page}>
      <div className={styles.headerContainer}>
        <button className={styles.button} onClick={handleCreate}>
          + Добавить заметку
        </button>
      </div>
      <ul className={styles.notes}>
        {notes.map((note) => (
          <NoteDetailsUI
            key={note.id}
            note={note}
          />
        ))}
      </ul>
    </section>
  );
};
