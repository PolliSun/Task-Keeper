import { FC } from "react";
import styles from "./mobile-view.module.css";
import { TasksPage } from "../../../pages/tasks-list/tasks-list";
import { PageHeader } from "../../page-header/page-header";
import { Outlet, useLocation } from "react-router-dom";
import { SecondPageHeader } from "../../second-page-header/second-page-header";
import { SecondPageTitle } from "../../second-page-title/second-page-title";
import { FirstPageTitle } from "../../first-page-title/first-page-title";

export const MobileView: FC = () => {
  const location = useLocation();

  return (
    <section className={styles.tasks}>
      {location.pathname === "/" ? (
        <>
          <PageHeader />
          <div className={styles.page}>
            <FirstPageTitle />
            <ul className={`${styles.list} ${styles.listFirst}`}>
              <TasksPage />
            </ul>
          </div>
        </>
      ) : (
        <>
          <SecondPageHeader />
          <div className={styles.page}>
            <SecondPageTitle />
            <ul className={`${styles.list} ${styles.listFirst}`}>
              <Outlet />
            </ul>
          </div>
        </>
      )}
    </section>
  );
};
