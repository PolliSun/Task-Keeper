import { FC, useEffect, useState } from "react";
import { NoteFormUI } from "../ui/note-form/note-form";
import { TNote } from "../../types/type";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector, RootState } from "../../services/store";
import { editNote } from "../../services/slices/notesSlice";
import { NoteListUI } from "../ui/pages/notes-list/note-list";

export const NoteList: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notes = useSelector((state: RootState) => state.notes.notes);
  const searchResults = useSelector(
    (state: RootState) => state.notes.searchResults
  );
  const isSearching = useSelector((state: RootState) => state.notes.isSearching);
  const noteToEdit = id ? notes.find((note) => note.id === id) : undefined;

  const handleEditNote = (updatedNote: TNote) => {
    dispatch(editNote(updatedNote));
    navigate(-1);
  };

  if (id && noteToEdit) {
    return <NoteFormUI onSubmit={handleEditNote} initialData={noteToEdit} />;
  }

  if (isSearching && searchResults.length === 0) {
    return <NoteListUI title="Нет заметок по вашему запросу" notes={[]} />;
  }
  
  if (isSearching && searchResults.length > 0) {
    return <NoteListUI title="Заметки по вашему запросу:" notes={searchResults} />;
  }

  if (notes.length === 0) {
    return <NoteListUI title="Сейчас у вас нет заметок, давайте создадим их!" notes={[]} />;
  }
  
  return <NoteListUI notes={notes} />;
};
