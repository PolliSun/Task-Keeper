import { FC, RefObject } from "react";
import styles from "./task-header.module.css";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { RiSearchLine } from "react-icons/ri";
import { LuChevronDownSquare } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";

type TaskHeaderUIProps = {
  onCreateTask: () => void;
  isCreateActive: boolean;
  onSearch: (searchTerm: string) => void;
  isSearchVisible: boolean;
  onSearchClick: () => void;
  onFavoritesClick: () => void;
  isFavoritesVisible: boolean;
  searchTerm: string;
  searchInputRef: RefObject<HTMLInputElement>;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  isSortOpen: boolean;
  onSortClick: () => void;
  onSortSelect: (sortBy: "date" | "alphabet" | "priority") => void;
};

export const TaskHeaderUI: FC<TaskHeaderUIProps> = ({
  onCreateTask,
  isCreateActive,
  onSearch,
  isSearchVisible,
  isFavoritesVisible,
  onSearchClick,
  onFavoritesClick,
  searchTerm,
  searchInputRef,
  isFocused,
  onFocus,
  onBlur,
  isSortOpen,
  onSortClick,
  onSortSelect,
}) => {
  return (
    <>
      <header className={styles.header}>
        <div
          className={`${styles.searchContainer} ${
            isSearchVisible ? styles.active : ""
          }`}
        >
          <button
            className={`${styles.button} ${styles.buttonSearch} ${
              isSearchVisible ? styles.active : ""
            }`}
            onClick={onSearchClick}
          >
            <RiSearchLine
              size={23}
              className={isFocused ? styles.rotateIconSearch : ""}
            />
          </button>
          <input
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className={`${styles.searchInput} ${
              isSearchVisible ? styles.active : ""
            }`}
            placeholder="Поиск по заметкам..."
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
        <div className={styles.buttonContainer}>
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
          <button
            onClick={onFavoritesClick}
            className={`${styles.button} ${styles.favoritesButton} ${
              isFavoritesVisible ? styles.active : ""
            }`}
          >
            <FaRegHeart size={22} />
          </button>
          <button
            className={`${styles.button} ${styles.buttonCreate} ${
              isCreateActive ? styles.active : ""
            }`}
            onClick={onCreateTask}
          >
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
          </div>
        )}
      </header>
    </>
  );
};
