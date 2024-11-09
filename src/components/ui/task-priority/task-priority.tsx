import React, { FC } from "react";
import styles from "./task-priority.module.css";

type TaskPriorityUIProps = {
  priority: string;
  backgroundColor: string;
};

export const TaskPriorityUI: FC<TaskPriorityUIProps> = ({
  priority,
  backgroundColor,
}) => {
  return (
    <div className={styles.priority} style={{ backgroundColor }}>
      <h3 className={styles.title}>{priority}</h3>
    </div>
  );
};
