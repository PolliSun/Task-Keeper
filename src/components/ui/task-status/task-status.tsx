import React, { FC } from "react";
import styles from "./task-status.module.css";

type TaskStatusUIProps = {
  status: string;
  color: string;
};

export const TaskStatusUI: FC<TaskStatusUIProps> = ({
  status,
  color,
}) => {
  return (
    <div className={styles.status} >
      <h3 className={styles.title} style={{ color }}>{status}</h3>
    </div>
  );
};
