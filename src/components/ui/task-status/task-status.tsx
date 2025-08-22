import { FC } from "react";
import styles from "./task-status.module.css";
import { IconType } from "react-icons"; 

type TaskStatusUIProps = {
  status?: string;
  color?: string;
  icon?: IconType;
};

export const TaskStatusUI: FC<TaskStatusUIProps> = ({
  status,
  color,
  icon: Icon,
}) => {
  return (
    <>
      {Icon && <Icon color={color} size={16}/>}

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
      {status === "новая" && (
        <div className={`${styles.status} ${styles.statusNew}`}>
          <h3 className={styles.title}>
            {status}
          </h3>
        </div>
      )}
      {status === "отложена" && (
        <div className={`${styles.status} ${styles.statusPostponed}`}>
          <h3 className={styles.title}>
            {status}
          </h3>
        </div>
      )}
      {status === "тестирование" && (
        <div className={`${styles.status} ${styles.statusTesting}`}>
          <h3 className={styles.title}>
            {status}
          </h3>
        </div>
      )}
    </>
  );
};
