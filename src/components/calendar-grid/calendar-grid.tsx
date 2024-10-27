import React, { FC } from "react";
import { useSelector, RootState } from "../../services/store";
import { CalendarGridUI } from "../ui/pages/calendar-grid/calendar-grid";

export const CalendarGrid: FC = () => {
  const { month, year } = useSelector(
    (state: RootState) => state.calendar.currentDate
  );

  return <CalendarGridUI month={month} year={year} />;
};