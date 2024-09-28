import React, { FC } from "react";
import { TNote } from "../../types/type";
import styles from "./note-card.module.css";
import paperclip from "../../images/paperclip.svg";

type NoteCardUIProps = {
  note: TNote;
  isModal?: boolean;
};

export const NoteCardUI: FC<NoteCardUIProps> = ({ note, isModal }) => {
  return (
    <div className={styles.noteConteiner}>
      <img
        className={`${styles.noteImage} ${
          isModal ? styles.modalNoteImage : ""
        }`}
        src={note.image}
        alt={note.title}
      />
      <small
        className={`${styles.noteDate} ${isModal ? styles.modalNoteDate : ""}`}
      >
        {note.date}
      </small>
      <h2
        className={`${styles.notTitle} ${isModal ? styles.modalNotTitle : ""}`}
      >
        {note.title}
      </h2>
      <div className={`${styles.noteConteinerParagraph} ${isModal ? styles.modalNoteConteinerParagraph : ""}`}>
      <button
          className={`${styles.buttonClip} ${
            isModal ? styles.modalButtonClip : ""
          }`}
        >
          <img
            src={paperclip}
            alt="иконка закрепленной заметки"
            className={`${styles.paperClip} ${
              isModal ? styles.modalPaperClip : ""
            }`}
          />
        </button>
        <p
          className={`${styles.noteParagraph} ${
            isModal ? styles.modalNnteParagraph : ""
          }`}
        >
          {note.content}
        </p>
        
      </div>
    </div>
  );
};
