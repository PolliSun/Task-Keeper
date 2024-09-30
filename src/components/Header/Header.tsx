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
    <header className={styles.header}>
      <a href="#" onClick={handleNavigation} className={styles.link}>
        <img src={logo} className={styles.logo} alt="Logo" />
        <h1 className={styles.title}>Note Keeper</h1>
      </a>
      <nav className={styles.navigation}>
        <button
          className={styles.button}
          onClick={() => navigate("/notes-page")}
        >
          Заметки
        </button>
        <button className={styles.button}>Календарь</button>
        <button className={styles.button}
          onClick={() => navigate("/to-do-page")}
        >Список дел</button>
      </nav>
    </header>
  );
};
