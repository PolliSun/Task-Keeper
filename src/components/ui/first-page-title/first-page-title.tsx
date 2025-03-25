import { FC } from "react";
import styles from "./first-page-title.module.css";
import { TTask } from "../../../types/type";

type FirstPageTitleUIProps = {
  tasks: TTask[];
  title: string;
  noTasksTitle?: string;
};

export const FirstPageTitleUI: FC<FirstPageTitleUIProps> = ({
  tasks,
  title,
  noTasksTitle,
}) => {
  return (
    <div className={styles.titleContainer}>
      <h3 className={styles.title}>
        {tasks.length > 0 ? title : noTasksTitle}
      </h3>
    </div>
  );
};
