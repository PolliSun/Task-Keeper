import { FC } from "react";
import styles from "./page-header.module.css";

import { LuChevronDownSquare } from "react-icons/lu";
import { BsListTask } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { TbClockExclamation } from "react-icons/tb";
import { TTask } from "../../../types/type";

type PageHeaderUIProps = {
  tasks: TTask[];
  title: string;
  noTasksTitle?: string;
  onSortClick: () => void;
  isSortOpen: boolean;
  onSortSelect: (sortBy: "date" | "alphabet" | "priority") => void;
  onFilterSelect: (sortBy: "favorites" | "overdue" | "search" | "all") => void;
  activeFilter: string;
};

export const PageHeaderUI: FC<PageHeaderUIProps> = ({
  tasks,
  title,
  noTasksTitle,
  onSortClick,
  isSortOpen,
  onSortSelect,
  onFilterSelect,
  activeFilter,
}) => {
  return (
    <>
      <div className={styles.filters}>
        <button onClick={onSortClick} className={styles.filterButton}>
          <LuChevronDownSquare
            size={20}
            className={isSortOpen ? styles.iconRotated : styles.icon}
          />
        </button>
        <button
          className={`${styles.filterButton} ${
            activeFilter === "all" ? styles.active : ""
          }`}
          onClick={() => onFilterSelect("all")}
        >
          <BsListTask size={20} />
        </button>
        <button
          className={`${styles.filterButton} ${
            activeFilter === "favorites" ? styles.active : ""
          }`}
          onClick={() => onFilterSelect("favorites")}
        >
          <FaRegHeart size={20} />
        </button>
        <button
          className={`${styles.filterButton} ${
            activeFilter === "overdue" ? styles.active : ""
          }`}
          onClick={() => onFilterSelect("overdue")}
        >
          <TbClockExclamation size={20} />
        </button>
      </div>

      {isSortOpen && (
        <div className={styles.sortDropdown}>
          <button onClick={() => onSortSelect("date")}>По дате</button>
          <button onClick={() => onSortSelect("alphabet")}>По алфавиту</button>
          <button onClick={() => onSortSelect("priority")}>
            По приоритету
          </button>
        </div>
      )}
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>
          {tasks.length > 0 ? title : noTasksTitle}
        </h3>
      </div>
    </>
  );
};
