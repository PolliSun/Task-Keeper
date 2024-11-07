import React, { FC } from "react";
import { TTask } from "../../../types/type";
import styles from "./task-details.module.css";
import { TaskPriority } from "../../task-priority/task-priority";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";

type TaskDetailsUIProps = {
  task: TTask;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onPin?: (id: string) => void;
};

export const TaskDetailsUI: FC<TaskDetailsUIProps> = ({
  task,
  onDelete,
  onToggle,
  onPin,
}) => {
  return (
    <>
      <li className={styles.content}>
        <div className={styles.titleContainer}>
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
        </div>
        <div className={styles.dateContainer}>
          <p className={styles.date}>
            дата создания: 
          </p>
          <span className={styles.createDate}>{new Date(task.date).toLocaleDateString()}</span>
          <p className={styles.date}>дата начала:</p>
          <span className={styles.startDate}>{task.startDate}</span>
          <p className={styles.date}>дата окончания:</p>
          <span className={styles.endDate}>{task.endDate}</span>
        </div>
        <div className={styles.priorityContainer}>
          <TaskPriority priority={task.priority} />
          <p className={styles.priority}>
            - <span>{task.priority}.</span>
          </p>
        </div>
        {task.subtasks && task.subtasks.length > 0 && (
          <div className={styles.subtaskContainer}>
            <h2 className={styles.subtaskTitle}>список подзадач:</h2>
            <ul className={styles.subtaskList}>
              {task.subtasks.map((subtask) => (
                <li key={subtask.id} className={styles.subtaskItem}>
                  <h2 className={styles.subtaskListTitle}>{subtask.title}</h2>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => onDelete(task.id)}>
            <RiDeleteBin5Line size={20} />
          </button>
        </div>
      </li>
    </>
  );
};
