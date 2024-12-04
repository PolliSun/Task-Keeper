import React, { FC } from "react";
import styles from "./day-card.module.css";
import { TDay } from "../../../types/type";

type DayCardUIProps = {
  day: TDay;
  onClickDay: () => void;
  isToday: boolean;
  isDaySelected: (dayId: string) => boolean;
};

export const DayCardUI: FC<DayCardUIProps> = ({
  day,
  onClickDay,
  isToday,
  isDaySelected,
}) => {
  return (
    <>
      {day.day === 0 ? (
        <div className={styles.emptyDay} />
      ) : (
        <li
          key={day.id}
          onClick={onClickDay}
          className={`${styles.day}
      ${isToday ? styles.today : ""} ${
            isDaySelected(day.id) ? styles.selectedDay : ""
          }`}
        >
          <span>{day.day}</span>
          {day.tasks?.length > 0 && <span className={styles.haveTasks}>T</span>}
        </li>
      )}
    </>
  );
};
