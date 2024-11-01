import React, { FC } from "react";
import { TTask } from "../../../types/type";
import styles from "./task-details.module.css";
import { TaskPriority } from "../../task-priority/task-priority";
import { RiDeleteBin5Line } from "react-icons/ri";

type TaskDetailsUIProps = {
  task: TTask;
  onDelete: (id: string) => void;
  remainingTime: string;
  onToggle: (id: string) => void;
  /*   onPin?: (id: string) => void; */
};

export const TaskDetailsUI: FC<TaskDetailsUIProps> = ({
  task,
  onDelete,
  remainingTime,
  onToggle,
  /*   onPin, */
}) => {
  return (
    <>
      <li className={styles.content}>
        <h2 className={styles.title}>{task.title}</h2>
        <label
          className={`${styles.customCheckboxContainer} ${
            task.status ? styles.checked : ""
          }`}
        >
          <input
            type="checkbox"
            checked={task.status}
            onChange={() => onToggle(task.id)}
            className={styles.hiddenCheckbox}
          />
          <span className={styles.customCheckbox}></span>
        </label>
        <div className={styles.dateContainer}>
          <p className={styles.date}>
            Дата создания: {new Date(task.date).toLocaleDateString()}
          </p>
        </div>
        <div className={styles.priorityContainer}>
          <TaskPriority priority={task.priority} />
          <p className={styles.priority}>Приоритет: {task.priority}.</p>
          <div className={styles.timer}>Оставшееся время: {remainingTime}.</div>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => onDelete(task.id)}>
            <RiDeleteBin5Line size={20} />
          </button>
        </div>
      </li>
    </>
  );
};
