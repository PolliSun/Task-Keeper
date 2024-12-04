import React, { FC } from "react";
import styles from "./task-priority.module.css";

type TaskPriorityUIProps = {
  priority: string;
  color: string;
};

export const TaskPriorityUI: FC<TaskPriorityUIProps> = ({
  priority,
  color,
}) => {
  return (
    <div className={styles.priority} >
      <h3 className={styles.title} style={{ color }}>{priority}</h3>
    </div>
  );
};
