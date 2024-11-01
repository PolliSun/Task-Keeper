import { FC, RefObject } from "react";
import styles from "./task-header.module.css";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { TbClockQuestion } from "react-icons/tb";
import { RiSearchLine } from "react-icons/ri";
import { LuEraser } from "react-icons/lu";
import { LuChevronDownSquare } from "react-icons/lu";


type TaskHeaderUIProps = {
  totalTasks: number;
  completedTasks: number;
  onCreateTask: () => void;
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
  searchInputRef: RefObject<HTMLInputElement>;
  isFocused: boolean;
  onEraserClick: () => void;
  onFocus: () => void;
  onBlur: () => void;
  isSortOpen: boolean;
  onSortClick: () => void;
  onSortSelect: (sortBy: "date" | "alphabet" | "priority" | "favorites") => void;
};

export const TaskHeaderUI: FC<TaskHeaderUIProps> = ({
  totalTasks,
  completedTasks,
  onCreateTask,
  onSearch,
  searchTerm,
  searchInputRef,
  isFocused,
  onEraserClick,
  onFocus,
  onBlur,
  isSortOpen,
  onSortClick,
  onSortSelect,
}) => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.searchContainer}>
          <button className={styles.button} onClick={onEraserClick}>
            {searchTerm === "" || isFocused ? (
              <RiSearchLine
                size={23}
                className={isFocused ? styles.rotateIconSearch : ""}
              />
            ) : (
              <LuEraser
                size={23}
                className={!isFocused ? styles.rotateIconEraser : ""}
              />
            )}
          </button>
          <input
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className={styles.searchInput}
            placeholder="Поиск по заметкам..."
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
        <div className={styles.counter}>
          Задачи: {completedTasks}/{totalTasks}
        </div>
        <div className={styles.buttonContainer}>
          <button
            onClick={onSortClick}
            className={`${styles.button} ${styles.sortButton} ${
              isSortOpen ? "open" : ""
            }`}
          >
            <LuChevronDownSquare
              size={23}
              className={isSortOpen ? styles.iconRotated : styles.icon}
            />
          </button>
          <button className={styles.button}>
            <TbClockQuestion size={23} />
          </button>
          <button className={styles.button} onClick={onCreateTask}>
            <RiStickyNoteAddLine size={23} />
          </button>
        </div>
        {isSortOpen && (
          <div className={styles.sortDropdown}>
            <button onClick={() => onSortSelect("date")}>По дате</button>
            <button onClick={() => onSortSelect("alphabet")}>
              По алфавиту
            </button>
            <button onClick={() => onSortSelect("priority")}>
              По приоритету
            </button>
            <button onClick={() => onSortSelect("favorites")}>
              По избранности
            </button>
          </div>
        )}
      </header>
    </>
  );
};
