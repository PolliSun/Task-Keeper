import React from "react";
import { TNote } from "../types/type";
import { useNavigate } from "react-router-dom";
import "../styles/note.css";

type NoteProps = {
  note: TNote;
  onDelete: (id: string) => void;
};

export const Note: React.FC<NoteProps> = ({ note, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="note-conteiner">
      <h2 className="note-title">{note.title}</h2>
      <p className="note-paragraph">{note.content}</p>
      <img className="note-image" src={note.image} alt={note.title} />
      <div className="date-conteiner">
        <small className="note-date">{note.date}</small>
        <div className="button-conteiner" >
        <button className="button button-delete" onClick={() => onDelete(note.id)}>
          Удалить
        </button>
        <button
          className="button button-edit"
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
  );
};
