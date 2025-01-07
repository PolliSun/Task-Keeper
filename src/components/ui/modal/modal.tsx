import React, { FC, ReactNode } from "react";
import styles from "./modal.module.css";
import { TaskHeader } from "../../task-header/task-header";
import { TasksPage } from "../../../pages/tasks-list/tasks-list";
import { DatasPage } from "../../../pages/datas/datas";
import { PageHeader } from "../../page-header/page-header";
import { SecondPageHeader } from "../../second-page-header/second-page-header";

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
            <ul className={styles.list}>
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
            <ul className={styles.list}>
              <DatasPage />
              {children}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
};
