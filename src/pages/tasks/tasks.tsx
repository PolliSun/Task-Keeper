import { FC } from "react";
import { TaskHeader } from "../../components/task-header/task-header";
import { TaskList } from "../../components/task-list/task-list";

export const Tasks: FC = () => {
    return (
      <main >
        <TaskHeader />
        <TaskList />
      </main>
    );
  };