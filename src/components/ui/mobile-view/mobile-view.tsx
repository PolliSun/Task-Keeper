import { FC } from "react";
import styles from "./mobile-view.module.css";
import { TasksPage } from "../../../pages/tasks-list/tasks-list";
import { PageHeader } from "../../page-header/page-header";
import { Outlet, useLocation } from "react-router-dom";
import { SecondPageHeader } from "../../second-page-header/second-page-header";

export const MobileView: FC = () => {
  const location = useLocation();

  return (
    <section className={styles.tasks}>
      {location.pathname === "/" ? (
        <div className={styles.page}>
          <PageHeader />
          <ul className={`${styles.list} ${styles.listFirst}`}>
            <TasksPage />
          </ul>
        </div>
      ) : (
        <div className={styles.page}>
          <SecondPageHeader />
          <ul className={`${styles.list} ${styles.listFirst}`}>
            <Outlet />
          </ul>
        </div>
      )}
    </section>
  );
};
