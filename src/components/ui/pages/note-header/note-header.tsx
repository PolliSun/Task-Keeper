import { FC, RefObject } from "react";
import styles from "./note-header.module.css";
import search from "../../../../images/search.svg";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { HiOutlineSortDescending } from "react-icons/hi";
import { RiSearchLine } from "react-icons/ri";
import { LuEraser } from "react-icons/lu";

type NoteHeaderUIProps = {
  onCreate: () => void;
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
  searchInputRef: RefObject<HTMLInputElement>;
  onSortClick: () => void;
  onSortSelect: (sortBy: "date" | "alphabet" | "priority") => void;
  isSortOpen: boolean;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onEraserClick: () => void;
};

export const NoteHeaderUI: FC<NoteHeaderUIProps> = ({
  onCreate,
  onSearch,
  searchTerm,
  searchInputRef,
  onSortClick,
  onSortSelect,
  isSortOpen,
  isFocused,
  onFocus,
  onBlur,
  onEraserClick,
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
              <LuEraser size={23} 
              className={!isFocused ? styles.rotateIconEraser : ""}/>
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
        <button
          className={`${styles.button} ${styles.buttonCreate}`}
          onClick={onCreate}
          aria-label="Добавить заметку"
        >
          <RiStickyNoteAddLine size={23} />
        </button>
        <button
          onClick={onSortClick}
          className={`${styles.button} ${styles.sortButton} ${
            isSortOpen ? "open" : ""
          }`}
        >
          <HiOutlineSortDescending
            size={23}
            className={isSortOpen ? styles.iconRotated : styles.icon}
          />
        </button>
        {isSortOpen && (
          <div className={styles.sortDropdown}>
            <button onClick={() => onSortSelect("date")}>По дате</button>
            <button onClick={() => onSortSelect("alphabet")}>
              По алфавиту
            </button>
            <button onClick={() => onSortSelect("priority")}>
              По важности
            </button>
          </div>
        )}
      </header>
    </>
  );
};
