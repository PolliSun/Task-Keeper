import { FC } from "react";
import { TaskPriorityUI } from "../ui/task-priority/task-priority";

type TaskPriorityProps = {
  priority: string;
};

export const TaskPriority: FC<TaskPriorityProps> = ({ priority }) => {
  let buttonColor = "";
  switch (priority) {
    case "высокий":
      buttonColor = "#f77";
      break;
    case "средний":
      buttonColor = "#e7a70f";
      break;
    case "низкий":
      buttonColor = "#54c154";
      break;
    case "без приоритета":
      buttonColor = "#9f9f9f";
      break;
  }

  return <TaskPriorityUI priority={priority} color={buttonColor} />;
};
