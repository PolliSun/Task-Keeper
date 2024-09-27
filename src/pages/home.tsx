import React from "react";
import { useEffect } from "react";
import { NoteList } from "../components/NoteList/NoteList";
import { getNotesFromStorage, saveNotesToStorage } from "../utils/noteStorage";
import { useDispatch, useSelector } from "../services/store";
import { deleteNote, setNotes } from "../services/slices/notesSlice";

export const Home: React.FC = () => {
  const dispatch = useDispatch();



  return (
    <div>
     <h1>Добро пожаловать!</h1>
    </div>
  );
};
