import { FC } from "react";
import { TNote } from "../../../types/type";
import styles from "./note-details.module.css";
import paperclip from "../../../images/paperclip.svg";
import pencil from "../../../images/pencil.svg";
import basket from "../../../images/basket.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GrPin } from "react-icons/gr";

type NoteDetailsUIProps = {
  note: TNote;
  isModal?: boolean;
  onDelete?: (id: string) => void;
  onPin?: (id: string) => void;
};

export const NoteDetailsUI: FC<NoteDetailsUIProps> = ({
  note,
  isModal,
  onDelete,
  onPin,
}) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/notes-page/edit/${note.id}`, {
      state: { background: "/notes-page" },
    });
  };

  return (
    <>
      <li key={note.id} className={isModal ? "" : styles.noteCard}>
        <Link
          to={`/notes-page/${note.id}`}
          state={{ background: "/notes-page" }}
        >
          <img
            className={`${styles.image} ${isModal ? styles.modalImage : ""}`}
            src={note.image}
            alt={note.title}
          />
          <small
            className={`${styles.date} ${isModal ? styles.modalDate : ""}`}
          >
            {note.date}
          </small>
          <h2 className={`${styles.title} ${isModal ? styles.modalTitle : ""}`}>
            {note.title}
          </h2>
          <p
            className={`${styles.paragraph} ${
              isModal ? styles.modalParagraph : ""
            }`}
          >
            {note.content}
          </p>
        </Link>
        <button
          aria-label="Закрепить заметку"
          className={`${styles.buttonСlip} ${
            isModal ? styles.modalButtonСlip : ""
          }`}
          onClick={(e) => {
            onPin && onPin(note.id);
          }}
        >
          <GrPin
            className={`${styles.iconClip} ${
              isModal ? styles.modalIconClip : ""
            }`}
            size={20}
            color={note.isPinned ? "#f7e47b" : "#000"}
          />
        </button>
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
            onClick={() => (onDelete ? onDelete(note.id) : undefined)}
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
