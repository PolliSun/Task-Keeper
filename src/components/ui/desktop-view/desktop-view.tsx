import { FC } from "react";
import { Outlet } from "react-router-dom";
import styles from "./desktop-view.module.css";
import { PageHeader } from "../../page-header/page-header";
import { DatasPage } from "../../../pages/datas/datas";
import { TasksPage } from "../../../pages/tasks-list/tasks-list";
import { SecondPageHeader } from "../../second-page-header/second-page-header";
import { FirstPageTitle } from "../../first-page-title/first-page-title";
import { SecondPageTitle } from "../../second-page-title/second-page-title";

export const DesktopView: FC = () => {
  return (
    <>
      <section className={styles.tasks}>
        <PageHeader />
        <div className={styles.page}>
          <FirstPageTitle />
          <ul className={`${styles.list} ${styles.listFirst}`}>
            <TasksPage />
          </ul>
        </div>
      </section>
      <section className={styles.data}>
        <SecondPageHeader />
        <div className={styles.pageData}>
          <SecondPageTitle />
          <ul className={`${styles.list} ${styles.listSecond}`}>
            <DatasPage />
            <Outlet />
          </ul>
        </div>
      </section>
    </>
  );
};
