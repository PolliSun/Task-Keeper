import React, { FC } from "react";
import styles from "./calendar-grid.module.css";

export const CalendarHeaderUI: FC= () => {
  return (
    <div className={styles.content}>
      <h1>Календарь</h1>
    </div>
  );
};
