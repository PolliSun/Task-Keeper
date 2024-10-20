import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TNote } from "../../types/type";
import {
  saveNotesToStorage,
  getNotesFromStorage,
} from "../../utils/noteStorage";

interface NotesState {
  notes: TNote[];
  searchResults: TNote[];
  searchTerm: string;
  isSearching: boolean;
  sortBy: "date" | "alphabet" | "priority" | null;
}

const initialState: NotesState = {
  notes: getNotesFromStorage(),
  searchResults: [],
  searchTerm: "",
  isSearching: false,
  sortBy: null,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes(state, action: PayloadAction<TNote[]>) {
      state.notes = action.payload;
      state.searchResults = [];
      saveNotesToStorage(state.notes);
    },
    addNote(state, action: PayloadAction<TNote>) {
      state.notes.push(action.payload);
      saveNotesToStorage(state.notes);
      state.searchResults = state.notes.filter(
        (note) =>
          note.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          note.date.includes(state.searchTerm)
      );
    },
    deleteNote(state, action: PayloadAction<string>) {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      saveNotesToStorage(state.notes);
      state.searchResults = state.notes.filter(
        (note) =>
          note.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          note.date.includes(state.searchTerm)
      );
    },
    editNote(state, action: PayloadAction<TNote>) {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      if (index !== -1) {
        state.notes[index] = action.payload;
        saveNotesToStorage(state.notes);
        state.searchResults = state.notes.filter(
          (note) =>
            note.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            note.content
              .toLowerCase()
              .includes(state.searchTerm.toLowerCase()) ||
            note.date.includes(state.searchTerm)
        );
      }
    },
    pinNote(state, action: PayloadAction<string>) {
      const index = state.notes.findIndex((note) => note.id === action.payload);
      if (index !== -1) {
        const note = state.notes[index];
        note.isPinned = !note.isPinned;
        state.notes.splice(index, 1);

        if (note.isPinned) {
          state.notes.unshift(note);
        } else {
          state.notes.push(note);
        }
        saveNotesToStorage(state.notes);
        state.searchResults = state.notes.filter(
          (note) =>
            note.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            note.content
              .toLowerCase()
              .includes(state.searchTerm.toLowerCase()) ||
            note.date.includes(state.searchTerm)
        );
      }
    },
    searchNotes(state, action: PayloadAction<string>) {
      const searchTerm = action.payload.toLowerCase();
      state.searchTerm = searchTerm;
      if (searchTerm === "") {
        state.searchResults = [];
        state.isSearching = false;
      } else {
        state.searchResults = state.notes.filter(
          (note) =>
            note.title.toLowerCase().includes(searchTerm) ||
            note.content.toLowerCase().includes(searchTerm) ||
            note.date.includes(searchTerm)
        );
        state.isSearching = true;
      }
    },
    sortNotes(state, action: PayloadAction<"date" | "alphabet" | "priority">) {
      state.sortBy = action.payload;

      switch (action.payload) {
        case "date":
          state.notes = state.notes
            .slice()
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );
          break;
        case "alphabet":
          state.notes = state.notes
            .slice()
            .sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "priority":
          state.notes = state.notes
            .slice()
            .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
          break;
        default:
          break;
      }

      if (state.searchResults.length > 0) {
        state.searchResults = state.searchResults.slice().sort((a, b) => {
          switch (action.payload) {
            case "date":
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            case "alphabet":
              return a.title.localeCompare(b.title);
            case "priority":
              return (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0);
            default:
              return 0;
          }
        });
      }
    },
  },
});

export const {
  setNotes,
  addNote,
  deleteNote,
  editNote,
  pinNote,
  searchNotes,
  sortNotes,
} = notesSlice.actions;
export default notesSlice.reducer;
