import { FC } from "react";
import { RootState, useSelector } from "../../services/store";
import { TasksListUI } from "../../components/ui/pages/tasks-list/tasks-list";
/* import { useParams } from "react-router-dom"; */
import { TTask } from "../../types/type";

export const TasksPage: FC = () => {
  const { tasks, searchResults, filter } = useSelector(
    (state: RootState) => state.tasks
  );

  console.log('Текущие задачи в сторе:', tasks);

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
          (task) => isTaskOverdue(task.end_date) && task.status !== "выполнена"
        );
        break;
      case "search":
        filteredTasksData = searchResults;
        break;
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
