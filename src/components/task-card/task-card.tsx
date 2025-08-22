import { FC, memo } from "react";
import { TaskCardUI } from "../ui/task-card/task-card";
import { Task } from "../../utils/api/taskService/taskService";

type TaskCardProps = {
  task: Task;
};

export const TaskCard: FC<TaskCardProps> = memo(({ task }) => {

  if (!task) return null;

  return (
    <TaskCardUI
      task={task}
    />
  );
});
