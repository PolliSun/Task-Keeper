import React, { FC } from "react";
import styles from "./calendar.module.css";

type CalendarUIProps = {
  currentMonth: number;
  currentYear: number;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  month: number;
  year: number;
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

const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export const CalendarUI: FC<CalendarUIProps> = ({
  currentMonth,
  currentYear,
  onPreviousMonth,
  onNextMonth,
  month,
  year,
}) => {
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    let firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const daysInMonth = getDaysInMonth(month, year);
  const firstDayOfMonth = getFirstDayOfMonth(month, year);
  const today = new Date();

  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);
  return (
    <div className={styles.content}>
      <header className={styles.header}>
        <div className={styles.notebookHoles}>
          {[...Array(7)].map((_, index) => (
            <div key={index} className={styles.hole} />
          ))}
        </div>
        <div className={styles.navigation}>
          <button onClick={onPreviousMonth}>◀</button>
          <h2>
            {months[currentMonth]} {currentYear}
          </h2>
          <button onClick={onNextMonth}>▶</button>
        </div>
      </header>
      <section className={styles.weekdaysDay}>
        <div className={styles.weekdays}>
          {weekdays.map((day) => (
            <div key={day} className={styles.weekday}>
              {day}
            </div>
          ))}
        </div>
        <div className={styles.days}>
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`}></div>
          ))}
          {days.map((day) => {
            const isToday =
              day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear();
            return (
              <div
                key={day}
                className={`${styles.day} ${isToday ? styles.today : ""}`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
