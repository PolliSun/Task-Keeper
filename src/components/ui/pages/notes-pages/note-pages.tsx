import { FC } from "react";
import { NoteDetailsUI } from "../../note-details/note-details";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./note-pages.module.css";
import { RootState, useSelector, useDispatch  } from "../../../../services/store";
import search from "../../../../images/search.svg";
import { pinNote } from "../../../../services/slices/notesSlice";

export const NotesPageUI: FC = () => {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreate = () => {
    navigate("/notes-page/create-note", { state: { background: location } });
  };

  const handlePinNote = (id: string) => {
    dispatch(pinNote(id)); 
  };

  return (
    <section className={styles.page}>
      <div className={styles.headerContainer}>
        <button className={styles.button}>
          <img
            src={search}
            alt="иконка поиска"
            className={styles.search}
          />
        </button>
        <button className={`${styles.button} ${styles.buttonCreate}`} onClick={handleCreate}>
          + Добавить заметку
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.notebookHolesTop}>
          {[...Array(7)].map((_, index) => (
            <div key={index} className={styles.hole} />
          ))}
        </div>
        <ul className={styles.notes}>
          {notes.map((note) => (
            <NoteDetailsUI key={note.id} note={note} onPin={handlePinNote}/>
          ))}
        </ul>
      </div>
    </section>
  );
};
