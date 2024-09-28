import React, { FC } from "react";
import { NoteCardUI } from "../note-card/note-card";
import { TNote } from "../../types/type";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./note-list.module.css";
import { RootState, useSelector } from "../../services/store";

export const NoteList: FC = () => {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const location = useLocation();
  const navigate = useNavigate();

  const handleCreateNote = () => {
    navigate("/notes-page/create-note", { state: { background: location } });
  };

  const handleCardClick = (id: string) => {
    navigate(`/notes-page/${id}`, { state: { background: location.pathname } });
  };

  return (
    <div className={styles.noteContainer}>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleCreateNote}>
          + Добавить заметку
        </button>
      </div>
      <ul className={styles.noteList}>
        {notes.map((note) => (
          <li
            key={note.id}
            className={styles.noteCard}
            onClick={() => handleCardClick(note.id)}
          >
            <NoteCardUI note={note} />
          </li>
        ))}
      </ul>
    </div>
  );
};
