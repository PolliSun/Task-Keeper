import React, { FC } from "react";
import { TDay, TTask } from "../../../types/type";
import styles from "./day-details.module.css";

type DayDetailsUIProps = {
  tasks: TTask[];
  selectedDay: TDay;
};

export const DayDetailsUI: FC<DayDetailsUIProps> = ({
  tasks,
  selectedDay,
}) => {
  return (
    <div className={styles.container}>
      {/* <h3 className={styles.title}>
      {selectedDay.day}.{selectedDay.month + 1}.{selectedDay.year}
      </h3> */}
        <ul className={styles.taskList}>
          {tasks.map((task) => (
            <li key={task.id} className={styles.taskItem}>
              <div className={styles.taskInfo}>
                <h2 className={styles.title}>{task.title}</h2>
                <p>
                  {new Date(task.startDate).toLocaleDateString()} - 
                  {new Date(task.endDate).toLocaleDateString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
    </div>
  );
};
