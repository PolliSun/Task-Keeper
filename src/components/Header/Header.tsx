import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import logo from "../../images/pencil.svg";

export const Header: React.FC = () => {
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
          onClick={() => navigate("/notes")}
        >
          Заметки
        </button>
        <button className={styles.buttonHeader}>Календарь</button>
        <button className={styles.buttonHeader}>Список дел</button>
      </nav>
    </div>
  );
};
