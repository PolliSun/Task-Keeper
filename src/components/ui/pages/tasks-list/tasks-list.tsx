import { FC } from "react";
import { TaskCard } from "../../../task-card/task-card";
import { Task } from "../../../../utils/api/taskService/taskService";

type TasksListUIProps = {
  tasks: Task[];
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
