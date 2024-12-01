import React, { FC, useMemo, useState } from "react";
import { TDay, TTask } from "../../types/type";
import { DayDetailsUI } from "../ui/day-details/day-details";

type DayDetailsProps = {
  tasks: TTask[];
  selectedDay: TDay;
};

export const DayDetails: FC<DayDetailsProps> = ({
  tasks,
  selectedDay,
}) => {

  return (
    <DayDetailsUI
      tasks={tasks}
      selectedDay={selectedDay}
    />
  );
};
