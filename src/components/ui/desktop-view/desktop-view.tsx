import { FC } from "react";
import { Outlet } from "react-router-dom";
import styles from "./desktop-view.module.css";
import { PageHeader } from "../../page-header/page-header";
import { DatasPage } from "../../../pages/datas/datas";
import { TasksPage } from "../../../pages/tasks-list/tasks-list";
import { SecondPageHeader } from "../../second-page-header/second-page-header";

export const DesktopView: FC = () => {
  return (
    <>
      <section className={styles.tasks}>
        <div className={styles.page}>
          <PageHeader />
          <ul className={`${styles.list} ${styles.listFirst}`}>
            <TasksPage />
          </ul>
        </div>
      </section>
      <section className={styles.data}>
        <div className={styles.pageData}>
          <SecondPageHeader />
          <ul className={`${styles.list} ${styles.listSecond}`}>
            <DatasPage /> 
            <Outlet />
          </ul>
        </div>
      </section>
    </>
  );
};
