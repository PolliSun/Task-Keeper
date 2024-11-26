import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCalendar, TDay } from "../../types/type";
import {
  getCalendarFromStorage,
  saveCalendarToStorage,
} from "../../utils/calendarStorage";

const generateDaysInMonth = (month: number, year: number): TDay[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const days: TDay[] = [];

  for (let i = 0; i < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); i++) {
    days.push({ id: `empty-${i}`, day: 0, month, year, tasks: [] });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ id: `${year}-${month}-${i}`, day: i, month, year, tasks: [] });
  }

  return days;
};

interface CalendarState {
  currentDate: { month: number; year: number };
  days: TDay[];
  selectedDate: { day: number; month: number; year: number } | null;
  // filterPeriod: { startPeriod: string | null; endPeriod: string | null };
}

const defaultDate = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
};

const initialState: CalendarState = {
  currentDate: getCalendarFromStorage()?.currentDate || defaultDate,
  days: getCalendarFromStorage()?.days || generateDaysInMonth(defaultDate.month, defaultDate.year),
  selectedDate: null,
  // filterPeriod: { startPeriod: null, endPeriod: null },
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setMonth(state, action: PayloadAction<number>) {
      state.currentDate.month = action.payload;
      state.days = generateDaysInMonth(state.currentDate.month, state.currentDate.year);
      saveCalendarToStorage({ currentDate: state.currentDate, days: state.days });
    },
    setYear(state, action: PayloadAction<number>) {
      state.currentDate.year = action.payload;
      state.days = generateDaysInMonth(state.currentDate.month, state.currentDate.year);
      saveCalendarToStorage({ currentDate: state.currentDate, days: state.days });
    },
    setDate(state, action: PayloadAction<{ day: number; month: number; year: number }>) {
      state.selectedDate = action.payload;
      saveCalendarToStorage({ currentDate: state.currentDate, days: state.days });
    },
    // setFilterPeriod(state, action: PayloadAction<{ startPeriod: string; endPeriod: string }>) {
    //   state.filterPeriod.startPeriod = action.payload.startPeriod;
    //   state.filterPeriod.endPeriod = action.payload.endPeriod;
    // },
    goToPreviousMonth(state) {
      if (state.currentDate.month === 0) {
        state.currentDate.month = 11;
        state.currentDate.year -= 1;
      } else {
        state.currentDate.month -= 1;
      }
      state.days = generateDaysInMonth(state.currentDate.month, state.currentDate.year);
      saveCalendarToStorage({ currentDate: state.currentDate, days: state.days });
    },
    goToNextMonth(state) {
      if (state.currentDate.month === 11) {
        state.currentDate.month = 0;
        state.currentDate.year += 1;
      } else {
        state.currentDate.month += 1;
      }
      state.days = generateDaysInMonth(state.currentDate.month, state.currentDate.year);
      saveCalendarToStorage({ currentDate: state.currentDate, days: state.days });
    },
  },
});

export const {
  setMonth,
  setYear,
  setDate,
  goToPreviousMonth,
  goToNextMonth,
  // setFilterPeriod,
} = calendarSlice.actions;

export default calendarSlice.reducer;