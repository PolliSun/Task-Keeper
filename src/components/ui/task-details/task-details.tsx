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

type TaskDetailsUIProps = {
  task: TTask;
  isOverdue: boolean;
  onDelete: (id: number) => void;
  onPin: (id: number) => void;
  onStatusChange: (newStatus: string) => void;
  onToggle: (taskId: number, subtaskId: number, completed: boolean) => void;
  onEditTask: (id: number) => void;
};

export const TaskDetailsUI: FC<TaskDetailsUIProps> = ({
  task,
  isOverdue,
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
        <div className={styles.titleContainer}>
          <p className={styles.createDate}>номер задачи: {task.id}</p>
          {isOverdue && (
            <div className={styles.overdueContainer}>
              <p className={styles.text}>Задача просрочена</p>
              <TbClockExclamation size={16} />
            </div>
          )}
          {task.status === "выполнен" && (
            <div className={styles.checkContainer}>
              <p className={styles.text}>Задача выполнена</p>
              <FaRegCircleCheck size={16} />
            </div>
          )}
          {task.status === "новый" && (
            <div className={styles.newContainer}>
              <p className={styles.text}>Новая задача</p>
              <SlStar size={16} />
            </div>
          )}
          <p className={styles.createDate}>
            создана: {new Date(task.date).toLocaleDateString()}
          </p>
        </div>
        <div className={styles.priorityContainer}>
          <span className={styles.titleColumn}>статус:</span>
          <div className={styles.statusGroup}>
            {["выполнен", "в работе", "отложен"].map((button) => (
              <button
                key={button}
                className={`${styles.statusButton} ${
                  task.status === button ? styles.active : ""
                }`}
                onClick={() => onStatusChange(button)}
              >
                {button.charAt(0).toUpperCase() + button.slice(1)}
              </button>
              /*               )) */
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
