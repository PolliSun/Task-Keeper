import React, { FC } from "react";
import { CalendarHeaderUI } from "../ui/pages/calendar-header/calendar-header";
import { useDispatch, useSelector, RootState } from "../../services/store";
import {
  goToPreviousMonth,
  goToNextMonth,
} from "../../services/slices/calendarSlice";

export const CalendarHeader: FC = () => {
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
    <CalendarHeaderUI
      currentMonth={month}
      currentYear={year}
      onPreviousMonth={handlePreviousMonth}
      onNextMonth={handleNextMonth}
    />
  );
};
