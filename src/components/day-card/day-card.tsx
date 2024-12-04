import React, { FC, useCallback } from "react";
import { TDay } from "../../types/type";
import { DayCardUI } from "../ui/day-card/day-card";

type DayCardProps = {
  day: TDay;
  onClickDay: () => void;
  isDaySelected: (dayId: string) => boolean;
};

export const DayCard: FC<DayCardProps> = ({ day, onClickDay, isDaySelected }) => {
  const today = new Date();
  const isToday = 
    day.day === today.getDate() &&
    day.month === today.getMonth() &&
    day.year === today.getFullYear();

  return (
    <DayCardUI
      day={day}
      isToday={isToday}
      onClickDay={onClickDay}
      isDaySelected={isDaySelected}
    />
  );
};
