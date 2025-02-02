import React, { FC } from "react";
import { TTask } from "../../../types/type";
import styles from "./task-details.module.css";
import { TaskPriority } from "../../task-priority/task-priority";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { TbClockExclamation } from "react-icons/tb";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { SlStar } from "react-icons/sl";
import { TaskStatus } from "../../task-status/task-status";

type TaskDetailsUIProps = {
  task: TTask;
  isOverdue: boolean;
  onDelete: (id: number) => void;
  onPin: (id: number) => void;
  onToggle: (taskId: number, subtaskId: number, completed: boolean) => void;
  onTaskComplete: (taskId: number, completed: boolean) => void;
  onEditTask: (id: number) => void;
};

export const TaskDetailsUI: FC<TaskDetailsUIProps> = ({
  task,
  isOverdue,
  onDelete,
  onPin,
  onToggle,
  onTaskComplete,
  onEditTask,
}) => {
  return (
    <>
      <li className={styles.content}>
        <div className={styles.headerContainer}>
          <div className={styles.titleContainer}>
            <div className={styles.stateContainer}>
              <p className={styles.numberTask}>Задача №{task.id}</p>
              <TaskStatus
                status={task.status}
                displayMode="text"
                endDate={task.endDate}
              />
            </div>
            <h2 className={styles.title}>{task.title}</h2>
          </div>
          <div className={styles.actionsContainer}>
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
                onClick={() => onEditTask(task.id)}
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
            <div className={styles.completeContainer}> 
              <button
                className={`${styles.completeButton} ${
                  task.completed ? styles.completed : ""
                }`}
                onClick={() => onTaskComplete(task.id, !task.completed)}
              >
                {task.completed ? "открыть" : "выполнить"}
              </button>
            </div>
          </div>
        </div>
        <div className={styles.priorityContainer}>
          <span className={styles.titleColumn}>создан:</span>
          <p className={styles.createDate}>
            {new Date(task.date).toLocaleDateString()}
          </p>
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
