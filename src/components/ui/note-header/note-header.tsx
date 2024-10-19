import { FC, RefObject } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./note-header.module.css";
import search from "../../../images/search.svg";

type NoteHeaderUIProps = {
/*   searchTerm: string;
  onSearchChange: () => void;
  notes: Array<any>;
  searchRef: RefObject<HTMLDivElement>; */
};

export const NoteHeaderUI: FC<NoteHeaderUIProps> = ({
/*   searchTerm,
  onSearchChange,
  notes,
  searchRef, */
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/notes-page/create-note", { state: { background: location } });
  };

  return (
    <>
      <header className={styles.header}>
{/*         <div className={styles.searchContainer} ref={searchRef}> */}
          <button className={styles.button}>
            <img src={search} alt="иконка поиска" className={styles.search} />
          </button>
 {/*          <input
            type="text"
            value={searchTerm}
            onChange={onSearchChange}
            className={styles.searchInput}
            placeholder="Поиск по заметкам..."
            autoFocus
          />
        </div> */}
        <button
          className={`${styles.button} ${styles.buttonCreate}`}
          onClick={handleCreate}
        >
          + Добавить заметку
        </button>
      </header>
    </>
  );
};
