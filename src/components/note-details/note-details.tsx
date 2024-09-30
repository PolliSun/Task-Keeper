import React, { FC } from "react";
import { TNote } from "../../types/type";
import styles from "./note-details.module.css";
import paperclip from "../../images/paperclip.svg";
import pencil from "../../images/pencil.svg";
import basket from "../../images/basket.svg";
import { useNavigate } from "react-router-dom";

type NoteCardUIProps = {
  note: TNote;
  isModal?: boolean;
  onDelete: (id: string) => void;
};

export const NoteDetailsUI: FC<NoteCardUIProps> = ({
  note,
  isModal,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleClickCard = (id: string) => {
    navigate(`/notes-page/${id}`, { state: { background: "/notes-page" } });
  };

  const handleEdit = () => {
    navigate(`/notes-page/edit/${note.id}`, {
      state: { background: "/notes-page" },
    });
  };

  return (
    <>
      <li
        key={note.id}
        className={isModal ? "" : styles.noteCard}
        onClick={() => handleClickCard(note.id)}
      >
        <img
          className={`${styles.image} ${isModal ? styles.modalImage : ""}`}
          src={note.image}
          alt={note.title}
        />
        <small className={`${styles.date} ${isModal ? styles.modalDate : ""}`}>
          {note.date}
        </small>
        <h2 className={`${styles.title} ${isModal ? styles.modalTitle : ""}`}>
          {note.title}
        </h2>
        <div
          className={`${styles.conteinerParagraph} ${
            isModal ? styles.modalConteinerParagraph : ""
          }`}
        >
          <button
            className={`${styles.buttonСlip} ${
              isModal ? styles.modalButtonСlip : ""
            }`}
          >
            <img
              src={paperclip}
              alt="иконка закрепленной заметки"
              className={`${styles.iconClip} ${
                isModal ? styles.modalIconClip : ""
              }`}
            />
          </button>
          <p
            className={`${styles.paragraph} ${
              isModal ? styles.modalParagraph : ""
            }`}
          >
            {note.content}
          </p>
        </div>
      </li>
      {isModal && (
        <div className={styles.modalButtonConteiner}>
          <button className={styles.modalButton} onClick={handleEdit}>
            <img
              src={pencil}
              alt="иконка редактирования заметки"
              className={styles.pencil}
            />
          </button>
          <button
            className={styles.modalButton}
            onClick={() => onDelete(note.id)}
          >
            <img
              src={basket}
              alt="иконка удаления заметки"
              className={styles.basket}
            />
          </button>
        </div>
      )}
    </>
  );
};
