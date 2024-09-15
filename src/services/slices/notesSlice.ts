import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TNote } from '../../types/type';

interface NotesState {
    notes: TNote[];
}

const initialState: NotesState = {
    notes: []
}

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setNotes(state, action: PayloadAction<TNote[]>) {
            state.notes = action.payload;
        },
        addNote(state, action: PayloadAction<TNote>) {
            state.notes.push(action.payload);
        },
        deleteNote(state, action: PayloadAction<string>) {
            state.notes = state.notes.filter(note => note.id !== action.payload);
        },
        editNote(state, action: PayloadAction<TNote>) {
            const index = state.notes.findIndex(note => note.id === action.payload.id);
            if(index !== -1) {
                state.notes[index] = action.payload;
            }
        }
    }
});

export const { setNotes, addNote, deleteNote, editNote } = notesSlice.actions;
export default notesSlice.reducer;