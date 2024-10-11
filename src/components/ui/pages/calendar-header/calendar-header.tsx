import React, { FC } from "react";
import styles from "./calendar-header.module.css";

type CalendarHeaderUIProps = {
  currentMonth: number;
  currentYear: number;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
};

const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export const CalendarHeaderUI: FC<CalendarHeaderUIProps> = ({
  currentMonth,
  currentYear,
  onPreviousMonth,
  onNextMonth,
}) => {
  return (
    <div className={styles.header}>
      <button onClick={onPreviousMonth}>◀</button>
      <h2>
        {months[currentMonth]} {currentYear}
      </h2>
      <button onClick={onNextMonth}>▶</button>
    </div>
  );
};
