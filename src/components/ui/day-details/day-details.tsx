import React, { FC } from "react";
import { TDay, TTask } from "../../../types/type";
import styles from "./day-details.module.css";

type DayDetailsUIProps = {
  tasks: TTask[];
  selectedDay: TDay;
};

export const DayDetailsUI: FC<DayDetailsUIProps> = ({ tasks, selectedDay }) => {
  return (
    <div className={styles.container}>
      {tasks.length > 0 ? (
        <ul className={styles.taskList}>
          {tasks.map((task) => (
            <li key={task.id} className={styles.taskItem}>
              <div className={styles.taskInfo}>
                <h2 className={styles.titleInfo}>{task.title}</h2>
                <p>
                  Дата начала: {new Date(task.startDate).toLocaleDateString()}
                </p>
                <p>
                  Дата окончания: {new Date(task.endDate).toLocaleDateString()}
                </p>
                <p>Дата создания: {new Date(task.date).toLocaleDateString()}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
