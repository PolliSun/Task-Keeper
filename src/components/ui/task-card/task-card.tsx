import React, { FC } from "react";
import { TTask } from "../../../types/type";
import styles from "./task-card.module.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineExclamationCircle } from "react-icons/ai";

type TaskCardUIProps = {
  task: TTask;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};

export const TaskCardUI: FC<TaskCardUIProps> = ({
  task,
  onDelete,
  onToggle,
}) => {
  return (
    <div className={styles.card}>
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
        <span
          className={`${styles.title} ${task.status ? styles.completed : ""}`}
        >
          {task.title}
        </span>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.priority}>
          <AiOutlineExclamationCircle
            size={24}
            className={styles.priorityIcon}
          />
        </button>
        <button className={styles.button} onClick={() => onDelete(task.id)}>
          <RiDeleteBin5Line size={0} />
        </button>
      </div>
    </div>
  );
};
