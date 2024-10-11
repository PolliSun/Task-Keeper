import React, { FC, useEffect, useState } from "react";
import styles from "./calendar.module.css";
import { CalendarHeaderUI } from "../ui/pages/calendar-header/calendar-header";
import { CalendarGridUI } from "../ui/pages/calendar-grid/calendar-grid";

interface CalendarProps {
  onDateChange?: (date: Date) => void;
}

export const Calendar: FC<CalendarProps> = ({ onDateChange }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  useEffect(() => {
    if (onDateChange) {
      onDateChange(new Date(currentYear, currentMonth));
    }
  }, [currentMonth, currentYear, onDateChange]);

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <section className={styles.page}>
      <CalendarHeaderUI
        currentMonth={currentMonth}
        currentYear={currentYear}
        onPreviousMonth={goToPreviousMonth}
        onNextMonth={goToNextMonth}
      />
      <CalendarGridUI month={currentMonth} year={currentYear} />
    </section>
  );
};
