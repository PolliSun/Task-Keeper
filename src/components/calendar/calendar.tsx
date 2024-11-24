import React, { FC } from "react";
import { CalendarUI } from "../ui/pages/calendar-header/calendar";
import { useDispatch, useSelector, RootState } from "../../services/store";
import {
  goToPreviousMonth,
  goToNextMonth,
} from "../../services/slices/calendarSlice";

export const Calendar: FC = () => {
  const dispatch = useDispatch();
  const { month, year } = useSelector(
    (state: RootState) => state.calendar.currentDate
  );

  const handlePreviousMonth = () => {
    dispatch(goToPreviousMonth());
  };

  const handleNextMonth = () => {
    dispatch(goToNextMonth());
  };

  return (
    <CalendarUI
      currentMonth={month}
      currentYear={year}
      onPreviousMonth={handlePreviousMonth}
      onNextMonth={handleNextMonth}
      month={month}
      year={year}
    />
  );
};
