import { FC } from "react";
import { TaskList } from "../../components/task-list/task-list";
import { RootState, useSelector } from "../../services/store";

export const Tasks: FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  return (
    <main>
      <TaskList tasks={tasks} />
    </main>
  );
};
