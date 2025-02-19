import { FC } from "react";
import styles from "./holiday-widget.module.css";

interface HolidayWidgetUIProps {
  holiday: { name: string; description: string } | null;
}

export const HolidayWidgetUI: FC<HolidayWidgetUIProps> = ({ holiday }) => {
  return (
    <div className={styles.factsContainer}>
      {holiday ? (
        <div>
          <h2 className={styles.factsTitle}>{holiday.name}</h2>
          <p className={styles.factsParagraph}>{holiday.description}</p>
        </div>
      ) : (
        <p>Сегодня нет специальных праздников</p>
      )}
    </div>
  );
};
