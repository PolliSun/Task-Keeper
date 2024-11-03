import React, { FC } from "react";
import { TaskPriorityUI } from "../ui/task-priority/task-priority";

type TaskPriorityProps = {
  priority: string;
};

export const TaskPriority: FC<TaskPriorityProps> = ({ priority }) => {
  let buttonStyle = "";
  switch (priority) {
    case "высокий":
            buttonStyle = "#ef282863";
            break;
        case "средний":
            buttonStyle = "#ffae0063";
            break;
        case "низкий":
            buttonStyle = "#00800063";
            break;
        case "без приоритета":
            buttonStyle = "#dddddd";
            break;
  }

  return <TaskPriorityUI backgroundColor={buttonStyle} />;
};
