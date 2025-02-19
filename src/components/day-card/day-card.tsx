import { FC } from "react";
import { TDay } from "../../types/type";
import { DayCardUI } from "../ui/day-card/day-card";

type DayCardProps = {
  day: TDay;
};

export const DayCard: FC<DayCardProps> = ({ day }) => {
  return (
    <DayCardUI
      day={day}
    //   onClick={handlClickDay}
    />
  );
};
