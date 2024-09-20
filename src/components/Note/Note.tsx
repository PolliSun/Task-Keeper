import React from "react";
import { TNote } from "../../types/type";
import { useNavigate } from "react-router-dom";
import "./note.css";

type NoteProps = {
  note: TNote;
  onDelete: (id: string) => void;
};

export const Note: React.FC<NoteProps> = ({ note, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="note_conteiner">
      <small className="note_date">{note.date}</small>
      <img className="note_image" src={note.image} alt={note.title} />
      <h2 className="note_title">{note.title}</h2>
      <p className="note_paragraph">{note.content}</p>
      
        <div className="button_conteiner">
          <button
            className="button_delete"
            onClick={() => onDelete(note.id)}
          >
            Удалить
          </button>
          <button
            className="button_edit"
            onClick={() =>
              navigate(`/edit/${note.id}`, {
                state: { background: { pathname: location.pathname } },
              })
            }
          >
            Редактировать
          </button>
      </div>
    </div>
  );
  /* return (
    <div className={styles.note_conteiner}>
      <h2 className={styles.note_title}>{note.title}</h2>
      <p className={styles.note_paragraph}>{note.content}</p>
      <img className={styles.note_image} src={note.image} alt={note.title} />
      <div className={styles.date_conteiner}>
        <small className={styles.note_date}>{note.date}</small>
        <div className={styles.button_conteiner} >
        <button className={`${styles.button} ${styles.button_delete}`} onClick={() => onDelete(note.id)}>
          Удалить
        </button>
        <button
          className={`${styles.button} ${styles.button_edit}`}
          onClick={() =>
            navigate(`/edit/${note.id}`, {
              state: { background: { pathname: location.pathname } },
            })
          }
        >
          Редактировать
        </button>
        </div>
      </div>
    </div>
  ); */
};
