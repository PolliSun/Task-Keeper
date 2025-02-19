import { FC } from "react";
import { TTask } from "../../../types/type";
import styles from "./task-card.module.css";
import { TaskPriority } from "../../task-priority/task-priority";
import { TaskStatus } from "../../task-status/task-status";
import { Link } from "react-router-dom";

type TaskCardUIProps = {
  task: TTask;
};

export const TaskCardUI: FC<TaskCardUIProps> = ({ task }) => {
  return (
    <Link to={`/task/${task.id}`} state={{ background: location.pathname }}>
      <li key={task.id} className={styles.card}>
        <div className={styles.dataContainer}>
          <TaskStatus
            status={task.status}
            displayMode="icon"
            endDate={task.endDate}
          />
          <h2 className={styles.title}>{task.title}</h2>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.endDateContainer}>
            <h3 className={styles.endDate}>
              {new Date(task.date).toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </h3>
          </div>
          <TaskPriority priority={task.priority} />
        </div>
      </li>
    </Link>
  );
};
