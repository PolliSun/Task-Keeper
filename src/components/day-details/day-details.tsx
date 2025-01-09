import React, { FC, useMemo } from "react";
import { TDay, TTask } from "../../types/type";
import { DayDetailsUI } from "../ui/day-details/day-details";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector, RootState } from "../../services/store";

export const DayDetails: FC = () => {
  const days = useSelector((state: RootState) => state.calendar.days);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const { id } = useParams<{ id: string }>();
  const dayData = days.find((day) => String(day.id) === id);

  const filteredTasks = useMemo(() => {
    if (!tasks || !dayData) return [];

    return tasks
      .filter((task) => {
        const taskStartDate = new Date(task.startDate);
        const taskEndDate = new Date(task.endDate);
        const currentDay = new Date(dayData.year, dayData.month, dayData.day);
        taskStartDate.setHours(0, 0, 0, 0);

        return taskStartDate <= currentDay && taskEndDate >= currentDay;
      })
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );
  }, [tasks, dayData]);

  return (
    <>
      {dayData ? (
        <DayDetailsUI day={dayData} tasks={filteredTasks} />
      ) : (
        <p>Данные о дне не найдены</p>
      )}
    </>
  );
};
