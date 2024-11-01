import React, { FC } from "react";
import { TTask } from "../../../types/type";
import styles from "./task-card.module.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TaskPriority } from "../../task-priority/task-priority";
import { FaRegHeart } from "react-icons/fa";

type TaskCardUIProps = {
  task: TTask;
  onToggle: (id: string) => void;
  onClick: (id: string) => void;
  remainingTime?: string;
  onPin?: (id: string) => void;
};

export const TaskCardUI: FC<TaskCardUIProps> = ({
  task,
  onToggle,
  onClick,
  remainingTime,
  onPin,
}) => {
  return (
    <>
      <li
        key={task.id}
        className={styles.card}
        onClick={() => onClick(task.id)}
      >
        <div className={styles.dataContainer}>
          <label className={styles.customCheckboxContainer}
            onClick={(e) => e.stopPropagation()}>
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
        <button
          aria-label="Закрепить заметку"
          className={styles.buttonСlip}
          onClick={(e) => {
            e.stopPropagation(); 
            onPin && onPin(task.id);
          }}
        >
          <FaRegHeart
            size={22}
            color={task.isPinned ? "#f7acea" : "#000"}
          />
        </button>
      </li>
    </>
  );
};
