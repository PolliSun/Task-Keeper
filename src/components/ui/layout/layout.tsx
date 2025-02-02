import styles from "./layout.module.css";
import React, { FC, ReactNode } from "react";
import { TaskHeader } from "../../task-header/task-header";

type LayoutProps = {
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <main className={styles.mainContent}>
      <TaskHeader />
      <div className={styles.content}>{children}</div>
      <div className={styles.noteBookHoles}>
        {[...Array(7)].map((_, index) => (
          <div key={index} className={styles.hole} />
        ))}
      </div>
    </main>
  );
};
