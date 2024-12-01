import React, { FC } from "react";
import { TTask } from "../../../types/type";
import styles from "./task-card.module.css";
import { TaskPriority } from "../../task-priority/task-priority";
import { TaskStatus } from "../../task-status/task-status";
import { LuCalendarX } from "react-icons/lu";

type TaskCardUIProps = {
  task: TTask;
  pinned: string | null;
  backgroundColor: string;
  isTaskSelected: (taskId: string) => boolean;
  onClickTask: () => void;
};

export const TaskCardUI: FC<TaskCardUIProps> = ({
  task,
  pinned,
  backgroundColor,
  isTaskSelected,
  onClickTask,
}) => {
  return (
    <li
      key={task.id}
      className={`${styles.card} ${
        isTaskSelected(task.id) ? styles.selectedCard : ""
      }`}
      onClick={onClickTask}
    >
      <div className={styles.dataContainer}>
        <h2 className={styles.title}>{task.title}</h2>
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.endDateContainer}>
          <LuCalendarX size={14} />
          <h3 className={styles.endDate}>
            {new Date(task.date).toLocaleDateString("ru-RU", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </h3>
        </div>
        <TaskPriority priority={task.priority} />
        <TaskStatus status={task.status} />
        {pinned && (
          <div className={styles.pinned} style={{ backgroundColor }}>
            <h3 className={styles.pinnedTitle}>{pinned}</h3>
          </div>
        )}
      </div>
    </li>
  );
};
