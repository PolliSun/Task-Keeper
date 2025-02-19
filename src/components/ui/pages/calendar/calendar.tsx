import { FC } from "react";
import styles from "./calendar.module.css";
import { TDay } from "../../../../types/type";
import { DayCard } from "../../../day-card/day-card";
import { HolidayWidget } from "../../../holiday-widget/holiday-widget";

type CalendarUIProps = {
  months: string[];
  weekdays: string[];
  currentMonth: number;
  currentYear: number;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  days: TDay[];
};

export const CalendarUI: FC<CalendarUIProps> = ({
  months,
  currentMonth,
  currentYear,
  onPreviousMonth,
  onNextMonth,
  weekdays,
  days,
}) => {
  return (
    <>
    <div className={styles.content}>
      <header className={styles.header}>
        <div className={styles.navigation}>
          <button onClick={onPreviousMonth}>◀</button>
          <h2>
            {months[currentMonth]} {currentYear}
          </h2>
          <button onClick={onNextMonth}>▶</button>
        </div>
      </header>
      <section>
        <div className={styles.weekdays}>
          {weekdays.map((weekday) => (
            <div key={weekday} className={styles.weekday}>
              {weekday}
            </div>
          ))}
        </div>
        <div className={styles.days}>
          {days.map((day) => (
            <DayCard
              key={day.id}
              day={day}
            />
          ))}
        </div>
        
      </section>
    </div>
    < HolidayWidget />
    </>
  );
};
