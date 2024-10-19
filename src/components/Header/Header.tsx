import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import logo from "../../images/paperclip.svg";
import { NavLink } from 'react-router-dom';

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
      <NavLink to={"/notes-page"} className={styles.navLink}>Заметки</NavLink>
      <NavLink to={"/calendar-page"} className={styles.navLink}>Календарь</NavLink>
      <NavLink to={"/to-do-page"} className={styles.navLink}>Таски</NavLink>
      </nav>
    </header>
  );
};
