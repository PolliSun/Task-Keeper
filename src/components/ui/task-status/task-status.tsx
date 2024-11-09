import React, { FC } from "react";
import styles from "./task-status.module.css";

type TaskStatusUIProps = {
  status: string;
  backgroundColor: string;
};

export const TaskStatusUI: FC<TaskStatusUIProps> = ({
  status,
  backgroundColor,
}) => {
  return (
    <div className={styles.status} style={{ backgroundColor }}>
      <h3 className={styles.title}>{status}</h3>
    </div>
  );
};
