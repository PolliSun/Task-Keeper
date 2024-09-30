import React, { FC } from "react";
import { NoteDetailsUI } from "../note-details/note-details";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./note-list.module.css";
import { RootState, useSelector, useDispatch } from "../../services/store";
import { deleteNote } from "../../services/slices/notesSlice";

export const NoteList: FC = () => {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateNote = () => {
    navigate("/notes-page/create-note", { state: { background: location } });
  };

  const handleDeleteNote = (id: string) => {
    dispatch(deleteNote(id));
  };

  return (
    <section className={styles.page}>
      <div className={styles.headerContainer}>
        <button className={styles.button} onClick={handleCreateNote}>
          + Добавить заметку
        </button>
      </div>
      <ul className={styles.notes}>
        {notes.map((note) => (
            <NoteDetailsUI note={note} onDelete={handleDeleteNote} />
        ))}
      </ul>
    </section>
  );
};
