import { FC } from "react";
import styles from "./task-details.module.css";
import { TaskPriority } from "../../task-priority/task-priority";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { Task } from "../../../utils/api/taskService/taskService";
import { TaskStatusSelector } from "../../task-status-selector/task-status-selector";

type TaskDetailsUIProps = {
  task: Task;
  onDelete: () => void;
  onPin: () => void;
  onSubtaskToggle: (subtaskId: number, completed: boolean) => void;
  onStatusSelect: (status: string) => void;
  onEditTask: () => void;
  onArchived: () => void;
};

export const TaskDetailsUI: FC<TaskDetailsUIProps> = ({
  task,
  onDelete,
  onPin,
  onSubtaskToggle,
  onEditTask,
  onStatusSelect,
  onArchived,
}) => {
  return (
    <>
      <li className={styles.content}>
        <div className={styles.headerContainer}>
          <div className={styles.titleContainer}>
            <div className={styles.stateContainer}>
              <p className={styles.numberTask}>Задача №{task.id}</p>
              <TaskStatusSelector
                currentStatus={task.status}
                onStatusChange={onStatusSelect}
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
                onClick={onPin}
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
                onClick={onDelete}
              >
                <RiDeleteBin5Line size={20} />
              </button>
            </div>
            <div>
              <button onClick={onArchived}>Arhive</button>
            </div>
          </div>
        </div>
        <div className={styles.priorityContainer}>
          <span className={styles.titleColumn}>создан:</span>
          <p className={styles.createDate}>
            {new Date(task.created_at).toLocaleDateString()}
          </p>
          <span className={styles.titleColumn}>период:</span>
          <p className={styles.created_at}>
            {task.start_date
              ? new Date(task.start_date).toLocaleDateString("ru-RU", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : "не назначено"}{" "}
            -{" "}
            {task.end_date
              ? new Date(task.end_date).toLocaleDateString("ru-RU", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : "не назначено"}
          </p>
          <span className={styles.titleColumn}>приоритет:</span>
          <TaskPriority priority={task.priority} />
        </div>
        {task.description && (
          <div className={styles.descriptionContainer}>
            <p className={styles.description}>{task.description}</p>
          </div>
        )}
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
                        onSubtaskToggle(subtask.id, e.target.checked)
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
