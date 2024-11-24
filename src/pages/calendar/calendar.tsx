import React, { FC } from "react";
import { Calendar } from "../../components/calendar/calendar";
import { CalendarHeader } from "../../components/calendar-grid/calendar-grid";

export const CalendarPage: FC = () => {
  return (
    <main>
      <CalendarHeader />
      <Calendar />
      
    </main>
  );
};
