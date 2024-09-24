import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div className={styles.buttonContainer}>
        <button className={styles.buttonHeader}
        onClick={() => navigate("/")}>Заметки</button>
        <button className={styles.buttonHeader}>Календарь</button>
        <button className={styles.buttonHeader}>Список дел</button>
      </div>
      <div className={styles.titleContainer}>
        <a href="#" className={styles.logo}></a>
        <h1 className={styles.headerTitle}>Note Keeper _</h1>
      </div>
    </div>
  );
};
