import { FC } from "react";
import { TasksListUI } from "../../components/ui/pages/tasks-list/tasks-list";
import { useGetTasks } from "../../utils/hooks/useTasks/useTasks";
import { useUser } from "../../contexts/UserContext";

export const TasksPage: FC = () => {
  const { user } = useUser();
  const { data: tasks, isLoading, error } = useGetTasks(user?.userId || '');
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  // const { tasks, searchResults, filter } = useSelector(
  //   (state: RootState) => state.tasks
  // );

  // const isTaskOverdue = (endDate: string): boolean => {
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0);

  //   const taskEndDate = new Date(endDate);
  //   taskEndDate.setHours(0, 0, 0, 0);

  //   return taskEndDate < today;
  // };

  // const filteredTasks = () => {
  //   let filteredTasksData: TTask[] | [];

  //   const userTasks = tasks.filter(task => task.user_id === user?.id);

  //   switch (filter) {
  //     case "favorites":
  //       filteredTasksData = tasks.filter((task) => task.pinned);
  //       break;
  //     case "overdue":
  //       filteredTasksData = tasks.filter(
  //         (task) => isTaskOverdue(task.end_date) && task.status !== "выполнена"
  //       );
  //       break;
  //     case "search":
  //       filteredTasksData = searchResults.filter(task => task.user_id === user?.id);
  //       break;
  //     default:
  //       filteredTasksData = userTasks;
  //       break;
  //   }

  //   return filteredTasksData;
  // };

  // const tasksToDisplay = filteredTasks();

  return (
    <>
      <TasksListUI tasks={tasks?.data || []} />
    </>
  );
};
