import { FC } from "react";
import { TasksListUI } from "../../components/ui/pages/tasks-list/tasks-list";
import { useTasksContext } from "../../contexts/TaskContext";

export const TasksPage: FC = () => {
  const { sortedTasks, isLoading } = useTasksContext();
  if (isLoading) return <div>Loading...</div>;

  return <TasksListUI tasks={sortedTasks} />;
};
