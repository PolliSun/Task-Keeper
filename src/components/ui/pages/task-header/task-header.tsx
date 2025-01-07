import { FC, RefObject } from "react";
import styles from "./task-header.module.css";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { BiCalendar } from "react-icons/bi";
import { BiQuestionMark } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

type TaskHeaderUIProps = {
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
  searchInputRef: RefObject<HTMLInputElement>;
  onSearchClick: () => void;
  isSearchVisible: boolean;
};

export const TaskHeaderUI: FC<TaskHeaderUIProps> = ({
  onSearch,
  searchTerm,
  searchInputRef,
  onSearchClick,
  isSearchVisible,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.buttonSearch} ${
            isSearchVisible ? styles.active : ""
          }`}
          onClick={onSearchClick}
        >
          <IoSearch size={23} className={styles.iconSearch}/>
          <input
            type="text"
            ref={searchInputRef}
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className={styles.searchInput}
            placeholder="Поиск по заметкам..."
            onClick={(e) => e.stopPropagation()}
          />
        </button>
      </div>

      <div className={styles.buttonContainer}>
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
          <BiQuestionMark size={23} />
        </NavLink>
      </div>
    </header>
  );
};
