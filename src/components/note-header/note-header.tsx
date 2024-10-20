import { FC, useState, useRef, useEffect, useCallback } from "react";
import { NoteFormUI } from "../ui/note-form/note-form";
import { TNote } from "../../types/type";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "../../services/store";
import {
  addNote,
  searchNotes,
  sortNotes,
} from "../../services/slices/notesSlice";
import { NoteHeaderUI } from "../ui/pages/note-header/note-header";

export const NoteHeader: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleCreate = () => {
    navigate("/notes-page/create-note", { state: { background: location } });
  };

  const handleSaveNote = (newNote: TNote) => {
    dispatch(addNote(newNote));
    navigate("/notes-page");
    console.log(newNote.date)
  };

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      dispatch(searchNotes(term));
    },
    [dispatch]
  );

  const handleSortClick = () => {
    setIsSortOpen(prev => !prev);
  };

  const handleSortSelect = (sortBy: "date" | "alphabet" | "priority") => {
    dispatch(sortNotes(sortBy));
    setIsSortOpen(false);
  };

  const handleFocus = () => {
    setIsFocused(true); 
  };

  const handleBlur = () => {
    setIsFocused(false); 
  };

  const handleEraserClick = () => {
    if (!isFocused) {
      setSearchTerm("");
      dispatch(searchNotes(""));
    }
  };

  useEffect(() => {
    setSearchTerm(""); 
    dispatch(searchNotes(""));
  }, [location]);

  const isCreateNote = location.pathname === "/notes-page/create-note";

  if (isCreateNote) {
    return <NoteFormUI onSubmit={handleSaveNote} />;
  }

  return (
    <NoteHeaderUI
      onCreate={handleCreate}
      onSearch={handleSearch}
      searchTerm={searchTerm}
      searchInputRef={searchInputRef}
      onSortClick={handleSortClick}
      onSortSelect={handleSortSelect}
      isSortOpen={isSortOpen}
      isFocused={isFocused}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onEraserClick={handleEraserClick}
    />
  );
};
