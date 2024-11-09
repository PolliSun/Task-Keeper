import React, { FC } from "react";
import { TTask } from "../../../types/type";
import styles from "./task-card.module.css";
import { TaskPriority } from "../../task-priority/task-priority";
import { TaskStatus } from "../../task-status/task-status";
import { LuCalendar } from "react-icons/lu";

type TaskCardUIProps = {
  task: TTask;
  onClick: (id: string) => void;
  pinned: string | null;
  backgroundColor: string;
};

export const TaskCardUI: FC<TaskCardUIProps> = ({
  task,
  onClick,
  pinned,
  backgroundColor,
}) => {
  return (
    <>
      <li
        key={task.id}
        className={styles.card}
        onClick={() => onClick(task.id)}
      >
        <div className={styles.dataContainer}>
          <h2 className={styles.title}>{task.title}</h2>
        </div>
        <div className={styles.buttonContainer}>
        <div className={styles.createDateContainer}>
            <LuCalendar size={14} />
            <h3 className={styles.createDate}>
              {new Date(task.date).toLocaleDateString()}
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
    </>
  );
};
