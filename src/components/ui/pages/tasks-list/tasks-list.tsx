import { FC } from "react";
import { TaskCard } from "../../../task-card/task-card";
import { TTask } from "../../../../types/type";

type TasksListUIProps = {
  tasks: TTask[];
};

export const TasksListUI: FC<TasksListUIProps> = ({
  tasks,
}) => {
  return (
    <>
      {tasks.length > 0
        ? tasks.map((task) => <TaskCard key={task.id} task={task} />)
        : null}
    </>
  );
};
