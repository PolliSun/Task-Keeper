import React, { FC, useState } from "react";
import { CalendarUI } from "../ui/pages/calendar/calendar";
import { useDispatch, useSelector, RootState } from "../../services/store";
import {
  goToPreviousMonth,
  goToNextMonth,
} from "../../services/slices/calendarSlice";
import { useParams } from "react-router-dom";
import { DayDetails } from "../day-details/day-details";

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

export const Calendar: FC = () => {
  const dispatch = useDispatch();

  const currentDate = useSelector(
    (state: RootState) => state.calendar.currentDate
  );
  const days = useSelector((state: RootState) => state.calendar.days);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const { id } = useParams<{ id: string }>();

  const handlePreviousMonth = () => {
    dispatch(goToPreviousMonth());
  };

  const handleNextMonth = () => {
    dispatch(goToNextMonth());
  };

  const dayData = days.find((day) => String(day.id) === id);

  return (
    <>
      <CalendarUI
        months={months}
        currentMonth={currentDate.month}
        currentYear={currentDate.year}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        weekdays={weekdays}
        days={days}
      />
      {dayData ? <DayDetails /> : null}
    </>
  );
};
