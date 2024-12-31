import React, { FC } from "react";
import styles from "./day-card.module.css";
import { TDay } from "../../../types/type";
import { Link } from "react-router-dom";

type DayCardUIProps = {
  day: TDay;
  isToday: boolean;
};

export const DayCardUI: FC<DayCardUIProps> = ({ day, isToday }) => {
  return (
    <>
      {day.day === 0 ? (
        <div className={styles.emptyDay} />
      ) : (
        <Link
          to={`/calendar/day/${day.id}`}
          state={{ background: location.pathname }}
        >
          <li
            key={day.id}
            className={`${styles.day}
          ${isToday ? styles.today : ""} `}
          >
            <span>{day.day}</span>
            {/* {day.tasks?.length > 0 && (
              <span className={styles.haveTasks}>T</span>
            )} */}
          </li>
        </Link>
      )}
    </>
  );
};
