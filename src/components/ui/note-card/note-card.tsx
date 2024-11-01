import { FC } from "react";
import { TNote } from "../../../types/type";
import styles from "./note-card.module.css";
import { Link } from "react-router-dom";
import { GrPin } from "react-icons/gr";

type NoteCardUIProps = {
  note: TNote;
  onPin?: (id: string) => void;
};

export const NoteCardUI: FC<NoteCardUIProps> = ({ note, onPin }) => {
  return (
    <>
      <li key={note.id} className={styles.card}>
        <Link
          to={`/notes-page/${note.id}`}
          state={{ background: "/notes-page" }}
        >
          <img className={styles.image} src={note.image} alt={note.title} />
          <p className={styles.date}>{new Date(note.date).toLocaleDateString()}</p>
          <h2 className={styles.title}>{note.title}</h2>
          <p className={styles.paragraph}>{note.content}</p>
        </Link>
        <button
          aria-label="Закрепить заметку"
          className={styles.buttonСlip}
          onClick={(e) => {
            onPin && onPin(note.id);
          }}
        >
          <GrPin
            size={20}
            color={note.isPinned ? "#f7e47b" : "#000"}
          />
        </button>
      </li>
    </>
  );
};
