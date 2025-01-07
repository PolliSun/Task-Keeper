import React, { FC } from "react";
import { TTask } from "../../../types/type";
import styles from "./task-card.module.css";
import { TaskPriority } from "../../task-priority/task-priority";
import { TaskStatus } from "../../task-status/task-status";
import { FaRegCalendarAlt, FaRegHeart } from "react-icons/fa";
import { TbClockExclamation } from "react-icons/tb";
import { FaRegCircleCheck } from "react-icons/fa6";
import { SlStar } from "react-icons/sl";
import { Link } from "react-router-dom";

type TaskCardUIProps = {
  task: TTask;
  pinned: string | null;
  isOverdue: boolean;
};

export const TaskCardUI: FC<TaskCardUIProps> = ({
  task,
  pinned,
  isOverdue,
}) => {
  return (
    <Link to={`/task/${task.id}`} state={{ background: location.pathname }}>
      <li key={task.id} className={styles.card}>
        <div className={styles.dataContainer}>
          <h2 className={styles.title}>{task.title}</h2>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.endDateContainer}>
            <FaRegCalendarAlt size={14} />
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
            <div className={styles.pinnedIcon}>
              <FaRegHeart size={16} />
            </div>
          )}
          {isOverdue && (
            <div className={styles.overdueIcon}>
              <TbClockExclamation size={16} />
            </div>
          )}
          {task.status === "выполнен" && (
            <div className={styles.checkedIcon}>
              <FaRegCircleCheck size={16} />
            </div>
          )}
          {task.status === "новый" && (
            <div className={styles.newIcon}>
              <SlStar size={16} />
            </div>
          )}
        </div>
      </li>
    </Link>
  );
};
