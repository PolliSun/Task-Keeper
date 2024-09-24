import React from "react";
import { TNote } from "../../types/type";
import { useNavigate } from "react-router-dom";
import styles from "./note.module.css";
import paperclip from "../../images/paperclip.svg";
import pencil from "../../images/pencil.svg";
import basket from "../../images/basket.svg";

type NoteProps = {
  note: TNote;
  onDelete: (id: string) => void;
};

export const Note: React.FC<NoteProps> = ({ note, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.noteConteiner}>
      <div className={styles.headerConteiner}>
        <small className={styles.noteDate}>{note.date}</small>
        <button className={styles.headerButton}>
          <img
            src={paperclip}
            alt="иконка закрепленной заметки"
            className={styles.paperClip}
          />
        </button>
      </div>
      <img className={styles.noteImage} src={note.image} alt={note.title} />
      <h2 className={styles.notTitle}>{note.title}</h2>
      <p className={styles.noteParagraph}>{note.content}</p>

      <div className={styles.buttonConteiner}>
        <button
          className={styles.button}
          onClick={() =>
            navigate(`/edit/${note.id}`, {
              state: { background: { pathname: location.pathname } },
            })
          }
        >
          <img
            src={pencil}
            alt="иконка редактирования заметки"
            className={styles.pencil}
          />
        </button>
        <button className={styles.button} onClick={() => onDelete(note.id)}>
        <img
            src={basket}
            alt="иконка удаления заметки"
            className={styles.basket}
          />
        </button>
      </div>
    </div>
  );
};
