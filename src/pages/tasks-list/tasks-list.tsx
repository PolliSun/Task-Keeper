import React, { FC } from "react";
import { RootState, useSelector } from "../../services/store";
import { TasksListUI } from "../../components/ui/pages/tasks-list/tasks-list";
import { useParams } from "react-router-dom";
import { DayDetails } from "../../components/day-details/day-details";
import { TTask } from "../../types/type";

export const TasksPage: FC = () => {
  const { tasks, searchResults, searchTerm, filter } = useSelector(
    (state: RootState) => state.tasks
  );
  const calendarDays = useSelector((state: RootState) => state.calendar.days);
  const { id } = useParams<{ id: string }>();

  const isTaskOverdue = (endDate: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const taskEndDate = new Date(endDate);
    taskEndDate.setHours(0, 0, 0, 0);

    return taskEndDate < today;
  };

  const filteredTasks = () => {
    let filteredTasksData: TTask[] | [];

    switch (filter) {
      case "favorites":
        filteredTasksData = tasks.filter((task) => task.pinned);
        break;
      case "overdue":
        filteredTasksData = tasks.filter(
          (task) => isTaskOverdue(task.endDate) && task.status !== "выполнена"
        );
        break;
      case "search":
        filteredTasksData = searchResults;
        break;
/*       case "day":
        const selectedDay = calendarDays.find((day) => String(day.id) === id);
        if (!selectedDay) {
          filteredTasksData = [];
          console.error(`Selected day not found for id: ${id}`);
        } else {
          filteredTasksData = tasks.filter((task) => {
            const taskStartDate = new Date(task.startDate);
            const taskEndDate = new Date(task.endDate);
            const currentDay = new Date(
              selectedDay.year,
              selectedDay.month,
              selectedDay.day
            );
            taskStartDate.setHours(0, 0, 0, 0);
            taskEndDate.setHours(0, 0, 0, 0);
            return taskStartDate <= currentDay && taskEndDate >= currentDay;
          });
        }
        break; */
      default:
        filteredTasksData = tasks;
        break;
    }

    return filteredTasksData;
  };

  const tasksToDisplay = filteredTasks();

  return (
    <>
      <TasksListUI tasks={tasksToDisplay} />
    </>
  );
};
