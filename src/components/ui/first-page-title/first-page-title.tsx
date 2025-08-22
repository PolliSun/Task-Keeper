import { FC } from "react";
import styles from "./first-page-title.module.css";
import { Task } from "../../../utils/api/taskService/taskService";
import { GrSearch } from "react-icons/gr";

type FirstPageTitleUIProps = {
  tasks: Task[];
  title: string;
  noTasksTitle?: string;
  isSearch: boolean;
  searchTerm: string;
  onSearchChange: (text: string) => void;
  toggleClickSearch: () => void;
};

export const FirstPageTitleUI: FC<FirstPageTitleUIProps> = ({
  tasks,
  title,
  noTasksTitle,
  isSearch,
  searchTerm,
  onSearchChange,
  toggleClickSearch,
}) => {
  return (
    <div className={styles.title}>
      <div className={styles.titleContainer}>
        <h3 className={styles.mainTitle}>
          {tasks.length > 0 ? title : noTasksTitle}
        </h3>
        <div className={styles.search} onClick={toggleClickSearch}>
          <GrSearch size={18} />
        </div>
      </div>
      {isSearch && (
        <div className={styles.windowSearch}>
          <input
            type="text"
            placeholder="Поиск задач..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={styles.inputSearch}
          />
        </div>
      )}
    </div>
  );
};
