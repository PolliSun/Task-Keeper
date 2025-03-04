import styles from "./layout.module.css";
import { FC, ReactNode } from "react";
import { TaskHeaderUI } from "../../ui/pages/task-header/task-header";

type LayoutProps = {
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <main className={styles.mainContent}>
      <TaskHeaderUI />
      <div className={styles.content}>{children}</div>
      <div className={styles.noteBookHoles}>
        {[...Array(7)].map((_, index) => (
          <div key={index} className={styles.hole} />
        ))}
      </div>
    </main>
  );
};
