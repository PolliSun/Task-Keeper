import { FC } from "react";
import styles from "./second-page-title.module.css";

type SecondPageTitleUIProps = {
  title: string;
};

export const SecondPageTitleUI: FC<SecondPageTitleUIProps> = ({ title }) => {
  return (
    <div className={styles.titleContainer}>
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
};
