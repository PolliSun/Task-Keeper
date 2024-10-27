import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import notesReducer from './slices/notesSlice';
import tasksReducer from './slices/toDoSlice';
import calendarReducer from './slices/calendarSlice';

import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
  } from 'react-redux';  

export const rootReducer = combineReducers({
  notes: notesReducer,
  tasks: tasksReducer,
  calendar: calendarReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
