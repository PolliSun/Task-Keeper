import { FC } from "react";
import styles from "./task-card.module.css";
import { TaskPriority } from "../../task-priority/task-priority";
import { TaskStatus } from "../../task-status/task-status";
import { Link } from "react-router-dom";
import { Task } from "../../../utils/api/taskService/taskService";

type TaskCardUIProps = {
  task: Task;
};

export const TaskCardUI: FC<TaskCardUIProps> = ({ task }) => {
  return (
    <Link to={`/dashboard/task/${task.id}`}>
      <li key={task.id} className={styles.card}>
        <div className={styles.dataContainer}>
          <TaskStatus status={task.status} displayMode="icon" />
          <h2 className={styles.title}>{task.title}</h2>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.endDateContainer}>
            <h3 className={styles.endDate}>
              {new Date(task.created_at).toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </h3>
          </div>
          <TaskPriority priority={task.priority} />
        </div>
        {task.tags && (
          <div>
            <ul className={styles.tagsList}>
              {task.tags.slice(0, 5).map((tag, index) => {
                return (
                  <li key={index}>
                    <p className={styles.tagName}>{tag}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </li>
    </Link>
  );
};
