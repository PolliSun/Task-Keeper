import React, { FC, useEffect } from "react";
import { NoteList } from "../components/note-list/note-list";

export const NotesPage: FC = () => {
  return (
    <div>
      <NoteList />
    </div>
  );
};
