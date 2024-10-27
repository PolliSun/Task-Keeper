import React, { FC } from "react";
import { TTask } from "../../../types/type";
import styles from "./task-card.module.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TaskPriority } from "../../task-priority/task-priority";

type TaskCardUIProps = {
  task: TTask;
  onToggle: (id: string) => void;
  onClick: (id: string) => void;
  remainingTime?: string;
};

export const TaskCardUI: FC<TaskCardUIProps> = ({
  task,
  onToggle,
  onClick,
  remainingTime,
}) => {
  return (
    <>
      <li
        key={task.id}
        className={styles.card}
        onClick={() => onClick(task.id)}
      >
        <div className={styles.dataContainer}>
          <label className={styles.customCheckboxContainer}>
            <input
              type="checkbox"
              checked={task.status}
              onChange={() => onToggle(task.id)}
              className={styles.hiddenCheckbox}
            />
            <span className={styles.customCheckbox}></span>
          </label>
          <h2
            className={`${styles.title} ${task.status ? styles.completed : ""}`}
          >
            {task.title}
          </h2>
        </div>
        <div className={styles.buttonContainer}>
          <TaskPriority priority={task.priority} />
          <div className={styles.timer}>{remainingTime}</div>
        </div>
      </li>
    </>
  );
};
