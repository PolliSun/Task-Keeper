import { FC } from "react";
import styles from "./holiday-widget.module.css";

interface HolidayWidgetUIProps {
  holiday: { name: string; description: string } | null;
}

export const HolidayWidgetUI: FC<HolidayWidgetUIProps> = ({ holiday }) => {
  return (
    <>
      {holiday ? (
        <div className={styles.factsContainer}>
          <h2 className={styles.factsTitle}>{holiday.name}</h2>
          <p className={styles.factsParagraph}>{holiday.description}</p>
        </div>
      ) : null}
    </>
  );
};
