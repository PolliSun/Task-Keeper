import { FC } from "react";
import styles from "./page-header.module.css";

import { LuChevronDown } from "react-icons/lu";
import { BsListTask } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { TbClockExclamation } from "react-icons/tb";
import { FiArchive } from "react-icons/fi";

type PageHeaderUIProps = {
  onSortClick: () => void;
  isSortOpen: boolean;
  onSortSelect: (sortBy: "date" | "priority" | "status") => void;
  onFilterSelect: (sortBy: "all" | "favorites" | "overdue") => void;
  activeFilter: string;
};

export const PageHeaderUI: FC<PageHeaderUIProps> = ({
  onSortClick,
  isSortOpen,
  onSortSelect,
  onFilterSelect,
  activeFilter,
}) => {
  return (
    <div className={styles.filters}>
      <div className={styles.filterButtons}>
        <div
          onClick={onSortClick}
          className={`${styles.filterButton} ${
            isSortOpen ? styles.active : ""
          }`}
        >
          <LuChevronDown
            size={18}
            className={isSortOpen ? styles.iconRotated : styles.icon}
          />
          {isSortOpen && (
            <div className={styles.sortDropdown}>
              <button onClick={() => onSortSelect("date")}>Д</button>
              <button onClick={() => onSortSelect("priority")}>П</button>
              <button onClick={() => onSortSelect("status")}>С</button>
            </div>
          )}
        </div>

        <button
          className={`${styles.filterButton} ${
            activeFilter === "all" ? styles.active : ""
          }`}
          onClick={() => onFilterSelect("all")}
        >
          <BsListTask size={18} />
        </button>

        <button
          className={`${styles.filterButton} ${
            activeFilter === "favorites" ? styles.active : ""
          }`}
          onClick={() => onFilterSelect("favorites")}
        >
          <FaRegHeart size={18} />
        </button>

        <button
          className={`${styles.filterButton} ${
            activeFilter === "overdue" ? styles.active : ""
          }`}
          onClick={() => onFilterSelect("overdue")}
        >
          <TbClockExclamation size={18} />
        </button>
      </div>
      <div>
        <button
          className={`${styles.filterButton} ${styles.buttonArchive} ${
            activeFilter === "archive" ? styles.active : ""
          }`}
          onClick={() => onFilterSelect("archive")}
        >
          <FiArchive size={18} />
        </button>
      </div>
    </div>
  );
};
