import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TNote } from "../../types/type";
import {
  saveNotesToStorage,
  getNotesFromStorage,
} from "../../utils/noteStorage";

interface NotesState {
  notes: TNote[];
}

const initialState: NotesState = {
  notes: getNotesFromStorage(),
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes(state, action: PayloadAction<TNote[]>) {
      state.notes = action.payload;
      saveNotesToStorage(state.notes);
    },
    addNote(state, action: PayloadAction<TNote>) {
      state.notes.push(action.payload);
      saveNotesToStorage(state.notes);
    },
    deleteNote(state, action: PayloadAction<string>) {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      saveNotesToStorage(state.notes);
    },
    editNote(state, action: PayloadAction<TNote>) {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      if (index !== -1) {
        state.notes[index] = action.payload;
        saveNotesToStorage(state.notes);
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
      }
    },
    searchNotes(state, action: PayloadAction<string>) {
      const searchTerm = action.payload.toLowerCase();
      state.notes = state.notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm) ||
          note.content.toLowerCase().includes(searchTerm) ||
          note.date.includes(searchTerm)
      );
    },
  },
});

export const { setNotes, addNote, deleteNote, editNote, pinNote } =
  notesSlice.actions;
export default notesSlice.reducer;
