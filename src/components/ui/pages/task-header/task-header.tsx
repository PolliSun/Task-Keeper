import { FC, RefObject } from "react";
import styles from "./task-header.module.css";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { RiSearchLine } from "react-icons/ri";
import { LuChevronDownSquare } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { BiCalendar } from "react-icons/bi";
import { NavLink } from "react-router-dom";

type TaskHeaderUIProps = {
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
  searchInputRef: RefObject<HTMLInputElement>;
  onSearchClick: () => void;
  isSearchVisible: boolean;
  onSortClick: () => void;
  isSortOpen: boolean;
  onSortSelect: (sortBy: "date" | "alphabet" | "priority" | "status") => void;
  onFilterSelect: (sortBy: "favorites" | "completed" | "search" | "all") => void;
  activeFilter: string;
  onClickCalendar: () => void;
};

export const TaskHeaderUI: FC<TaskHeaderUIProps> = ({
  onSearch,
  searchTerm,
  searchInputRef,
  onSearchClick,
  isSearchVisible,
  onSortClick,
  isSortOpen,
  onSortSelect,
  onClickCalendar,
  onFilterSelect,
  activeFilter,
}) => {
  return (
    <header className={styles.header}>
      
      <button
        className={`${styles.button} ${styles.buttonSearch} ${
          isSearchVisible ? styles.active : ""
        }`}
        onClick={onSearchClick}
      >
        <input
          type="text"
          ref={searchInputRef}
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className={`${styles.searchInput} ${
            isSearchVisible ? styles.active : ""
          }`}
          placeholder="Поиск по заметкам..."
        />
      </button>

      <div className={styles.filters}>
        <button
          className={`${styles.button} ${styles.filterButton} ${
            activeFilter === "all" ? styles.active : ""
          }`}
          onClick={() => onFilterSelect("all")}
        >
          Все
        </button>
        <button
          className={`${styles.button} ${styles.filterButton} ${
            activeFilter === "favorites" ? styles.active : ""
          }`}
          onClick={() => onFilterSelect("favorites")}
        >
          Избранное
        </button>
        <button
          className={`${styles.button} ${styles.filterButton} ${
            activeFilter === "completed" ? styles.active : ""
          }`}
          onClick={() => onFilterSelect("completed")}
        >
          Выполненные
        </button>
      </div>

      <button
          onClick={onSortClick}
          className={`${styles.button} ${styles.sortButton} ${
            isSortOpen ? styles.active : ""
          }`}
        >
          <LuChevronDownSquare
            size={23}
            className={isSortOpen ? styles.iconRotated : styles.icon}
          />
        </button>
      {isSortOpen && (
        <div className={styles.sortDropdown}>
          <button onClick={() => onSortSelect("date")}>По дате</button>
          <button onClick={() => onSortSelect("alphabet")}>По алфавиту</button>
          <button onClick={() => onSortSelect("priority")}>
            По приоритету
          </button>
          <button onClick={() => onSortSelect("status")}>По статусу</button>
        </div>
      )}


      <NavLink
        to="/create"
        className={({ isActive }) =>
          `${styles.button} ${styles.buttonCreate} ${
            isActive ? styles.active : ""
          }`
        }
      >
        <RiStickyNoteAddLine size={23} />
      </NavLink>
      <NavLink
        to="/calendar"
        className={({ isActive }) =>
          `${styles.button} ${styles.buttonCalendar} ${
            isActive ? styles.active : ""
          }`
        }
      >
        <BiCalendar size={23} />
      </NavLink>
      <NavLink
        to="/faq"
        className={({ isActive }) =>
          `${styles.button} ${styles.buttonTasks} ${
            isActive ? styles.active : ""
          }`
        }
      >
        ?
      </NavLink>
    </header>
  );
};
