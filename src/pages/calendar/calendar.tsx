import React, { FC } from "react";
import { CalendarHeader } from "../../components/calendar-header/calendar-header";
import { CalendarGrid } from "../../components/calendar-grid/calendar-grid";

export const Calendar: FC = () => {
  return (
    <main>
      <CalendarHeader />
      <CalendarGrid />
    </main>
  );
};
