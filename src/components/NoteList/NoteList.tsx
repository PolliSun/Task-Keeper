import React from "react";
import { Note } from "../Note/Note";
import { TNote } from "../../types/type";
import { useLocation, useNavigate } from "react-router-dom";
import "./notelist.css";

type NoteListProps = {
  notes: TNote[];
  onDelete: (id: string) => void;
};

export const NoteList: React.FC<NoteListProps> = ({ notes, onDelete }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleCreateNote = () => {
    navigate("/create", { state: { background: location } });
  };

  return (
    <div className="note_container">
      <div className="button_container">
        <button className="button" onClick={handleCreateNote}>
          + Добавить заметку
        </button>
      </div>
      <ul className="note_list">
        {notes.map((note) => (
          <li key={note.id}>
            <Note note={note} onDelete={onDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
  /* return (
    <ul className={styles.note_list}>
      {notes.map((note) => (
        <li key={note.id}>
          <Note note={note} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  ); */
};
