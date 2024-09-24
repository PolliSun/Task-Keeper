import React from "react";
import { Note } from "../Note/Note";
import { TNote } from "../../types/type";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./notelist.module.css";

type NoteListProps = {
  notes: TNote[];
  onDelete: (id: string) => void;
};

export const NoteList: React.FC<NoteListProps> = ({ notes, onDelete }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleCreateNote = () => {
    navigate("/create", { state: { background: location } });
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
          <li key={note.id}>
            <Note note={note} onDelete={onDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
};
