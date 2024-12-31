import React, { FC } from "react";
import { TDay, TTask } from "../../../types/type";
import styles from "./day-details.module.css";

type DayDetailsUIProps = {
  day:TDay;
  tasks?: TTask[];
};

export const DayDetailsUI: FC<DayDetailsUIProps> = ({ day, tasks }) => {
  return (
    <div className={styles.container}>
      <h3>{day.id}</h3>
      <p>{day.tasks.length} задач</p>
      {/* {tasks.length > 0 ? ( */}
        <ul className={styles.taskList}>
          {tasks?.map((task) => (
            <li key={task.id} className={styles.taskItem}>
              <div className={styles.taskInfo}>
                <h2 className={styles.titleInfo}>{task.title}</h2>
                <p className={styles.dataInfo}>
                  Дата начала: {new Date(task.startDate).toLocaleDateString()}
                </p>
                <p className={styles.dataInfo}>
                  Дата окончания: {new Date(task.endDate).toLocaleDateString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      {/* ) : null} */}
    </div>
  );
};
