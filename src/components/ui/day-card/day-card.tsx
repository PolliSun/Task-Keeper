import React, { FC } from "react";
import styles from "./day-card.module.css";
import { TDay } from "../../../types/type";
import { NavLink } from "react-router-dom";

type DayCardUIProps = {
  day: TDay;
  // onClick: () => void;
};

export const DayCardUI: FC<DayCardUIProps> = ({ day }) => {
  return (
    <>
      {day.day === 0 ? (
        <div className={styles.emptyDay} />
      ) : (
        <NavLink
          to={`/calendar/day/${day.id}`}
          state={{ background: location.pathname }}
          className={({ isActive }) =>
            `${styles.day} ${day.isToday ? styles.today : ""} ${
              isActive ? styles.active : ""
            }`
          }
          // onClick={onClick}
        >
          <li key={day.id}>
            <span>{day.day}</span>
          </li>
        </NavLink>
      )}
    </>
  );
};
