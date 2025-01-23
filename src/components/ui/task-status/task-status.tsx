import React, { FC } from "react";
import styles from "./task-status.module.css";

type TaskStatusUIProps = {
  status?: "просрочена" | "выполнена" | "в работе";
  color?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const TaskStatusUI: FC<TaskStatusUIProps> = ({
  status,
  color,
  icon: Icon,
}) => {
  return (
    <>
      {Icon && <Icon color={color} />}

      {status === "просрочена" && (
        <div className={`${styles.status} ${styles.statusOverdue}`}>
          <h3 className={styles.title}>
            {status}
          </h3>
        </div>
      )}
      {status === "выполнена" && (
        <div className={`${styles.status} ${styles.statusCompleted}`}>
          <h3 className={styles.title}>
            {status}
          </h3>
        </div>
      )}
      {status === "в работе" && (
        <div className={`${styles.status} ${styles.statusProgress}`}>
          <h3 className={styles.title}>
            {status}
          </h3>
        </div>
      )}
    </>
  );
};
