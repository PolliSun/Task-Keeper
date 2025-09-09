import { FC, ReactNode } from "react";
import styles from "./wrepper-note-left.module.css";

type WrepperNoteLeftUIProps = {
  title: string;
  children: ReactNode;
};

export const WrepperNoteLeftUI: FC<WrepperNoteLeftUIProps> = ({
  title,
  children,
}) => {
  return (
    <div className={styles.wrepper}>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <div className={styles.noteBookHoles}>
          {[...Array(7)].map((_, index) => (
            <div key={index} className={styles.hole} />
          ))}
        </div>
        {children}
      </div>
    </div>
  );
};
