import React, { FC, useCallback } from "react";
import { TDay } from "../../types/type";
import { DayCardUI } from "../ui/day-card/day-card";
import { useDispatch } from "../../services/store";

type DayCardProps = {
  day: TDay;
};

export const DayCard: FC<DayCardProps> = ({ day }) => {

    const dispatch = useDispatch();
    

   

  return (
    <DayCardUI
      day={day}
    //   onClick={handlClickDay}
    />
  );
};
