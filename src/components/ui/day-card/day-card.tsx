import React, { FC } from "react";
import styles from "./day-card.module.css";
import { TDay } from "../../../types/type";

type DayCardUIProps = {
  day: TDay;
  onClickDay: () => void;
  isToday: boolean;
};

export const DayCardUI: FC<DayCardUIProps> = ({ day, onClickDay, isToday }) => {
  return (
    <>
      {day.day === 0 ? (
        <div className={styles.emptyDay} />
      ) : (
        <li
          key={day.id}
          onClick={onClickDay}
          className={`${styles.day} 
      ${isToday ? styles.today : ""} `}
        >
          <span>{day.day}</span>
        </li>
      )}
    </>
  );
};
