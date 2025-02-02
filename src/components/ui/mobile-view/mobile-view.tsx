import React, { FC, useState } from "react";
import styles from "./mobile-view.module.css";
import { TasksPage } from "../../../pages/tasks-list/tasks-list";
import { PageHeader } from "../../page-header/page-header";
import { TaskForm } from "../../task-form/task-form";
import { DatasPage } from "../../../pages/datas/datas";
import { EditPage } from "../../edit-page/edit-page";
import { TaskDetails } from "../../task-details/task-details";
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
        <div className={styles.pageData}>
          <SecondPageHeader />
          <ul className={`${styles.list} ${styles.listSecond}`}>
            <Outlet />
          </ul>
        </div>
      )}
    </section>
  );
};
