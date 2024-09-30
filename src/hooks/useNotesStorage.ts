import { useEffect } from "react";
import { useDispatch } from "../services/store";
import { setNotes } from "../services/slices/notesSlice";
import { getNotesFromStorage, saveNotesToStorage } from "../utils/noteStorage";
import { TNote } from "../types/type";

export const useNotesStorage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedNotes = getNotesFromStorage();
    dispatch(setNotes(savedNotes));
  }, [dispatch]);

  const saveNotes = (notes: TNote[]) => {
    saveNotesToStorage(notes);
  };

  return { saveNotes };
};
