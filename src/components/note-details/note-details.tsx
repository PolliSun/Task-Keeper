import React, { FC } from "react";
import { TNote } from "../../types/type";
import { useNavigate } from "react-router-dom";
import styles from "./note-details.module.css";
import pencil from "../../images/pencil.svg";
import basket from "../../images/basket.svg";
import { NoteCardUI } from "../note-card/note-card";

type NoteDetailsUIProps = {
  note: TNote;
  onDelete: (id: string) => void;
};

export const NoteDetailsUI: FC<NoteDetailsUIProps> = ({
  note,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/notes-page/edit/${note.id}`, {
      state: { background: "/notes-page" },
    });
  };

  const handleDelete = () => {
    onDelete(note.id);
  };

  return (
    <div className={styles.detailsModal}>
      <NoteCardUI note={note} isModal={true}/>
      <div className={styles.buttonConteiner}>
        <button className={styles.button} onClick={handleEdit}>
          <img
            src={pencil}
            alt="иконка редактирования заметки"
            className={styles.pencil}
          />
        </button>
        <button className={styles.button} onClick={handleDelete}>
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
