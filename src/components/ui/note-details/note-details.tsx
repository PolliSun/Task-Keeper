import { FC } from "react";
import { TNote } from "../../../types/type";
import styles from "./note-details.module.css";
import pencil from "../../../images/pencil.svg";
import basket from "../../../images/basket.svg";
import { useNavigate } from "react-router-dom";
import { GrPin } from "react-icons/gr";

type NoteDetailsUIProps = {
  note: TNote;
  onDelete: () => void;
  onPin: () => void;
};

export const NoteDetailsUI: FC<NoteDetailsUIProps> = ({
  note,
  onDelete,
  onPin,
}) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/notes-page/edit-note/${note.id}`, {
      state: { background: "/notes-page" },
    });
  };

  return (
    <div className={styles.content}>
      <img className={styles.image} src={note.image} alt={note.title} />
      <small className={styles.date}>{note.date}</small>
      <h2 className={styles.title}>{note.title}</h2>
      <p className={styles.paragraph}>{note.content}</p>
      <button
        aria-label="Закрепить заметку"
        className={styles.buttonСlip}
        onClick={onPin}
      >
        <GrPin
          className={styles.icon}
          size={20}
          color={note.isPinned ? "#f7e47b" : "#000"}
        />
      </button>
      <div className={styles.buttonConteiner}>
        <button className={styles.button} onClick={handleEdit}>
          <img
            src={pencil}
            alt="иконка редактирования заметки"
            className={styles.pencil}
          />
        </button>
        <button className={styles.button} onClick={onDelete}>
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
