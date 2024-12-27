import React, { FC } from "react";
import { TTask } from "../../../types/type";
import styles from "./task-details.module.css";
import { TaskPriority } from "../../task-priority/task-priority";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { TaskStatus } from "../../task-status/task-status";
import { FiEdit2 } from "react-icons/fi";

type TaskDetailsUIProps = {
  task: TTask;
  onDelete: (id: number) => void;
  onPin: (id: number) => void;
  onStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggle: (taskId: number, subtaskId: number, completed: boolean) => void;
  onEditTask: () => void;
};

export const TaskDetailsUI: FC<TaskDetailsUIProps> = ({
  task,
  onDelete,
  onPin,
  onStatusChange,
  onToggle,
  onEditTask,
}) => {
  return (
    <>
      <li className={styles.content}>
        <div className={styles.buttonContainer}>
          <button
            aria-label="Закрепить заметку"
            className={`${styles.buttonСlip} ${
              task.pinned ? styles.active : ""
            }`}
            onClick={() => {
              onPin && onPin(task.id);
            }}
          >
            <FaRegHeart size={20} />
          </button>
          <button
            aria-label="Редактировать заметку"
            className={styles.buttonEdit}
            onClick={onEditTask}
          >
            <FiEdit2 size={20} />
          </button>
          <button
            aria-label="Удалить заметку"
            className={styles.buttonDelete}
            onClick={() => onDelete(task.id)}
          >
            <RiDeleteBin5Line size={20} />
          </button>
        </div>
        <div className={styles.titleContainer}>
          <p className={styles.createDate}>номер задачи: {task.id}</p>
          <p className={styles.createDate}>
            создан: {new Date(task.date).toLocaleDateString()}
          </p>
        </div>
        <div className={styles.priorityContainer}>
          <span className={styles.titleColumn}>статус:</span>
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
          <span className={styles.titleColumn}>период:</span>
          <p className={styles.date}>
            {task.startDate
              ? new Date(task.startDate).toLocaleDateString("ru-RU", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : "не назначено"}{" "}
            -{" "}
            {task.endDate
              ? new Date(task.endDate).toLocaleDateString("ru-RU", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : "не назначено"}
          </p>
          <span className={styles.titleColumn}>приоритет:</span>
          <TaskPriority priority={task.priority} />
        </div>
        <h2 className={styles.title}>{task.title}</h2>
        <div className={styles.descriptionContainer}>
          <p className={styles.description}>{task.description}</p>
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
      </li>
    </>
  );
};
