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

  // const filteredTasks = useMemo(() => {
  //   return tasks.filter(task => {
  //     const selectedDate = new Date(
  //       selectedDay.year, 
  //       selectedDay.month, 
  //       selectedDay.day
  //     );
  //     const taskStartDate = new Date(task.startDate);
  //     const taskEndDate = new Date(task.endDate);

  //     return (
  //       (taskStartDate.toDateString() === selectedDate.toDateString()) ||
  //       (taskEndDate.toDateString() === selectedDate.toDateString()) ||
  //       (selectedDate >= taskStartDate && selectedDate <= taskEndDate)
  //     );
  //   });
  // }, [tasks, selectedDay]);

  return (
    <DayDetailsUI
      tasks={tasks}
      selectedDay={selectedDay}
    />
  );
};
