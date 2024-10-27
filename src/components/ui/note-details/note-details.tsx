import { FC } from "react";
import { TNote } from "../../../types/type";
import styles from "./note-details.module.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import { LuPencil } from "react-icons/lu";
import { GrPin } from "react-icons/gr";

type NoteDetailsUIProps = {
  note: TNote;
  onDelete: () => void;
  onPin: () => void;
  onEdit: () => void;
};

export const NoteDetailsUI: FC<NoteDetailsUIProps> = ({
  note,
  onDelete,
  onPin,
  onEdit,
}) => {
  return (
    <div className={styles.content}>
      <img className={styles.image} src={note.image} alt={note.title} />
      <p className={styles.date}>{new Date(note.date).toLocaleDateString()}</p>
      <h2 className={styles.title}>{note.title}</h2>
      <p className={styles.paragraph}>{note.content}</p>
      <button
        aria-label="Закрепить заметку"
        className={styles.buttonСlip}
        onClick={onPin}
      >
        <GrPin size={20} color={note.isPinned ? "#f7e47b" : "#000"} />
      </button>
      <div className={styles.buttonConteiner}>
        <button className={styles.button} onClick={onEdit}>
          <LuPencil size={24} />
        </button>
        <button className={styles.button} onClick={onDelete}>
          <RiDeleteBin5Line size={24} />
        </button>
      </div>
    </div>
  );
};
