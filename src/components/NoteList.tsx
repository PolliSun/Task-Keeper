import React from "react";
import { Note } from "./Note";
import { TNote } from "../types/type";
import "../styles/notelist.css";

type NoteListProps = {
  notes: TNote[];
  onDelete: (id: string) => void;
};

export const NoteList: React.FC<NoteListProps> = ({ notes, onDelete }) => {
  return (
    <ul className="note-list">
      {notes.map((note) => (
        <li key={note.id}>
          <Note note={note} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
};
