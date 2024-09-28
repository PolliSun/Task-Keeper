import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import logo from "../../images/paperclip.svg";

export const Header: FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/");
  };

  return (
    <div className={styles.header}>
      <a href="#" onClick={handleNavigation} className={styles.titleLink}>
        <img src={logo} className={styles.logo} alt="Logo" />
        <h1 className={styles.headerTitle}>Note Keeper</h1>
      </a>
      <nav className={styles.buttonContainer}>
        <button
          className={styles.buttonHeader}
          onClick={() => navigate("/notes-page")}
        >
          Заметки
        </button>
        <button className={styles.buttonHeader}>Календарь</button>
        <button className={styles.buttonHeader}>Список дел</button>
      </nav>
    </div>
  );
};
