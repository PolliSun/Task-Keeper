import React, { FC } from "react";
import styles from "./task-priority.module.css";
import { TbClockExclamation } from "react-icons/tb";

type TaskPriorityUIProps = {
  backgroundColor : string;
};

export const TaskPriorityUI: FC<TaskPriorityUIProps> = ({ backgroundColor  }) => {
  return (
    <div className={styles.priority} style={{ backgroundColor  }}>
      <TbClockExclamation size={22} />
    </div>
  );
};
