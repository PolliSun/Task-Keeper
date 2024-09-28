import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TToDo } from '../../types/type';

interface ToDoState {
    doings: TToDo[];
}

const initialState: ToDoState = {
    doings: []
}

const toDoSlice = createSlice({
    name: 'doings',
    initialState,
    reducers: {
        setDoings(state, action: PayloadAction<TToDo[]>) {
            state.doings = action.payload;
        },
        addDoing(state, action: PayloadAction<TToDo>) {
            state.doings.push(action.payload);
        },
        deliteDoing(state, action: PayloadAction<string>) {
            state.doings = state.doings.filter(doing => doing.id !== action.payload);
        }
    }
})

export const {setDoings, addDoing, deliteDoing} = toDoSlice.actions;
export default toDoSlice.reducer;