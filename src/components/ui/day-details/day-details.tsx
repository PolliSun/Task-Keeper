import { FC } from "react";
import { TDay, TTask } from "../../../types/type";
import styles from "./day-details.module.css";

type DayDetailsUIProps = {
  day: TDay;
  tasks?: TTask[];
};

export const DayDetailsUI: FC<DayDetailsUIProps> = ({ day, tasks }) => {
  return (
    <div className={styles.container}>
      {tasks && tasks.length > 0 ? (
        <>
          <p>колличество задач: {tasks.length}</p>
          {/* {tasks?.map((task) => (
            <TaskCard task={task} />
          ))} */}
        </>
      ) : (
        <p className={styles.title}>нет задач на {day.id} г.</p>
      )}
    </div>
  );
};
