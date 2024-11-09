import React, { FC } from "react";
import { TTask } from "../../../types/type";
import styles from "./task-details.module.css";
import { TaskPriority } from "../../task-priority/task-priority";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { TaskStatus } from "../../task-status/task-status";

type TaskDetailsUIProps = {
  task: TTask;
  onDelete: (id: string) => void;
  onPin: (id: string) => void;
  onStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggle: (taskId: string, subtaskId: string, completed: boolean) => void;
};

export const TaskDetailsUI: FC<TaskDetailsUIProps> = ({
  task,
  onDelete,
  onPin,
  onStatusChange,
  onToggle,
}) => {
  return (
    <>
      <li className={styles.content}>
        <button
          aria-label="Закрепить заметку"
          className={`${styles.buttonСlip} ${task.pinned ? styles.active : ""}`}
          onClick={() => {
            onPin && onPin(task.id);
          }}
        >
          <FaRegHeart
            size={20}
            // color={task.pinned ? "#f7acea" : "#000"}
          />
        </button>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{task.title}</h2>
          <div className={styles.statusGroup}>
            {["выполнен", "в работе", "отложен"].map((label) => (
              <label
                key={label}
                className={task.status === label ? styles.active : ""}
              >
                <input
                  type="radio"
                  name="status"
                  value={label}
                  checked={task.status === label}
                  onChange={onStatusChange}
                  className={styles.radioInput}
                />
                {label.charAt(0).toUpperCase() + label.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.dateContainer}>
          <p className={styles.date}>
            {task.startDate} | {task.endDate}
          </p>
        </div>
        <div className={styles.priorityContainer}>
          <TaskPriority priority={task.priority} />
          <TaskStatus status={task.status} />
          <div className={styles.createDateContainer}>
            <h3 className={styles.createDate}>
              {new Date(task.date).toLocaleDateString()}
            </h3>
          </div>
        </div>
        {task.subtasks && task.subtasks.length > 0 && (
          <>
            <h2 className={styles.subtaskTitle}>список подзадач:</h2>
            <ul className={styles.subtaskList}>
              {task.subtasks.map((subtask) => (
                <li key={subtask.id} className={styles.subtaskItem}>
                  <label
                    className={styles.customCheckboxContainer}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={subtask.completed || false}
                      onChange={(e) =>
                        onToggle(task.id, subtask.id, e.target.checked)
                      }
                      className={styles.hiddenCheckbox}
                    />
                    <span className={styles.customCheckbox}></span>
                  </label>
                  <p
                    className={`${styles.subtaskListTitle} ${
                      subtask.completed ? styles.completed : ""
                    }`}
                  >
                    {subtask.title}
                  </p>
                </li>
              ))}
            </ul>
          </>
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
