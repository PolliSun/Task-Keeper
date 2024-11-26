import React, { FC, useState } from "react";
import { CalendarUI } from "../ui/pages/calendar/calendar";
import { useDispatch, useSelector, RootState } from "../../services/store";
import {
  goToPreviousMonth,
  goToNextMonth,
} from "../../services/slices/calendarSlice";
import { DayCard } from "../day-card/day-card";
import { TDay } from "../../types/type";

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

type Props = {
  onDaySelect: (id: string) => void;
}

export const Calendar: FC<Props> = ({onDaySelect}) => {
  const dispatch = useDispatch();
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);

  const currentDate = useSelector((state: RootState) => state.calendar.currentDate);
  const days = useSelector((state: RootState) => state.calendar.days);

  const handleDayClick  = (id: string) => {
    onDaySelect(id);
    setSelectedDayId(id);
  }

  const handlePreviousMonth = () => {
    dispatch(goToPreviousMonth());
  };

  const handleNextMonth = () => {
    dispatch(goToNextMonth());
  };

  return (
    <CalendarUI
      months={months}
      currentMonth={currentDate.month}
      currentYear={currentDate.year}
      onPreviousMonth={handlePreviousMonth}
      onNextMonth={handleNextMonth}
      weekdays={weekdays}
      days={days}
      onDaySelect={handleDayClick}
    />
  );
};
