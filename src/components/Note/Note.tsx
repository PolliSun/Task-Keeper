import React from "react";
import { TNote } from "../../types/type";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();

  return (
    <div className={styles.noteConteiner}>
      <img className={styles.noteImage} src={note.image} alt={note.title} />
      <small className={styles.noteDate}>{note.date}</small>
      <h2 className={styles.notTitle}>{note.title}</h2>
      <div className={styles.noteConteinerParagraph}>
        <p className={styles.noteParagraph}>{note.content}</p>
        <img
          src={paperclip}
          alt="иконка закрепленной заметки"
          className={styles.paperClip}
        />
      </div>

      <div className={styles.buttonConteiner}>
        <button
          className={styles.button}
          onClick={() =>
            navigate(`/edit/${note.id}`, {
              state: { background: location.pathname }, 
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
