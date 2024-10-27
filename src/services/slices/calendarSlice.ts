import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCalendar } from "../../types/type";
import {
  getCalendarFromStorage,
  saveCalendarToStorage,
} from "../../utils/calendarStorage";

interface CalendarState {
  currentDate: TCalendar;
  selectedDate: Date | null;
}

const initialState: CalendarState = {
  currentDate: getCalendarFromStorage(),
  selectedDate: null,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setMonth(state, action: PayloadAction<number>) {
      state.currentDate.month = action.payload;
      saveCalendarToStorage(state.currentDate);
    },
    setYear(state, action: PayloadAction<number>) {
      state.currentDate.year = action.payload;
      saveCalendarToStorage(state.currentDate);
    },
    setDate(state, action: PayloadAction<Date>) {
      state.selectedDate = action.payload;
      state.currentDate.month = action.payload.getMonth();
      state.currentDate.year = action.payload.getFullYear();
      saveCalendarToStorage(state.currentDate);
    },
    setCalendarDate(state, action: PayloadAction<TCalendar>) {
      state.currentDate = action.payload;
      saveCalendarToStorage(state.currentDate);
    },
    goToPreviousMonth(state) {
      if (state.currentDate.month === 0) {
        state.currentDate.month = 11;
        state.currentDate.year -= 1;
      } else {
        state.currentDate.month -= 1;
      }
      saveCalendarToStorage(state.currentDate);
    },
    goToNextMonth(state) {
      if (state.currentDate.month === 11) {
        state.currentDate.month = 0;
        state.currentDate.year += 1;
      } else {
        state.currentDate.month += 1;
      }
      saveCalendarToStorage(state.currentDate);
    },
  },
});

export const {
  setMonth,
  setYear,
  setDate,
  setCalendarDate,
  goToPreviousMonth,
  goToNextMonth,
} = calendarSlice.actions;

export default calendarSlice.reducer;