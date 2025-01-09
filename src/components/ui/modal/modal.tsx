import React, { FC, ReactNode } from "react";
import styles from "./modal.module.css";
import { TaskHeader } from "../../task-header/task-header";
import { TasksPage } from "../../../pages/tasks-list/tasks-list";
import { DatasPage } from "../../../pages/datas/datas";
import { PageHeader } from "../../page-header/page-header";
import { SecondPageHeader } from "../../second-page-header/second-page-header";
import { useLocation } from "react-router-dom";
import { DayDetails } from "../../day-details/day-details";

type ModalUIProps = {
  children?: ReactNode;
};

export const ModalUI: FC<ModalUIProps> = ({ children }) => {
  return (
    <main className={styles.mainContent}>
      <TaskHeader />
      <div className={styles.content}>
        <section className={styles.tasks}>
          <div className={styles.page}>
            <PageHeader />
            <ul className={`${styles.list} ${styles.listFirst}`}>
              <TasksPage />
            </ul>
          </div>
        </section>
        <div className={styles.noteBookHoles}>
          {[...Array(7)].map((_, index) => (
            <div key={index} className={styles.hole} />
          ))}
        </div>
        <section className={styles.data}>
          <div className={styles.pageData}>
            <SecondPageHeader />
            <ul className={`${styles.list} ${styles.listSecond}`}>
              <DatasPage />
              {children}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
};
