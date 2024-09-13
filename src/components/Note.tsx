import React from "react";
import { TNote } from "../types/type";

type NoteProps = {
  note: TNote;
  onDelete: (id: string) => void;
};

export const Note: React.FC<NoteProps> = ({ note, onDelete }) => {
  return (
    <div>
      <h2>{note.title}</h2>
      <small>{note.date}</small>
      <p>{note.content}</p>
      <img src= {note.image} alt={note.title} style={{width: '100px'}} />
      <button onClick={() => onDelete(note.id)}>Удалить</button>
    </div>
  );
};
