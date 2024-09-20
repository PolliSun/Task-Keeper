import React from "react";
import './header.css';

export const Header: React.FC = () => {

  return (
    <div className="header">
      <div className="button_container">
        <button className="button-header">Заметки</button>
        <button className="button-header">Календарь</button>
        <button className="button-header">Список дел</button>
      </div>
      <div className="title_container">
        <a href="#" className="logo"></a>
        <h1 className="header_title">Note Keeper _</h1>
      </div>
    </div>
  );

  /* return (
    <div className={styles.header}>
      <div className={styles.title_container}>
        <a href="#" className={styles.logo}></a>
        <h1 className={styles.header_title}>Note Keeper</h1>
      </div>
      <div className={styles.button_header_container}>
        <button className={styles.header_button} onClick={handleCreateNote}>
          Добавить заметку
        </button>
      </div>
    </div>
  ); */
};
