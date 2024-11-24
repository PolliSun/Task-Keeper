import React, { FC } from "react";
import { TaskPriorityUI } from "../ui/task-priority/task-priority";

type TaskPriorityProps = {
  priority: string;
};

export const TaskPriority: FC<TaskPriorityProps> = ({ priority}) => {
  let buttonStyle = "";
  switch (priority) {
    case "высокий":
            buttonStyle = "#fba4a4";
            break;
        case "средний":
            buttonStyle = "#ffd375";
            break;
        case "низкий":
            buttonStyle = "#a2d3a2";
            break;
        case "без приоритета":
            buttonStyle = "#BDBDBD";
            break;
  }

  return <TaskPriorityUI priority={priority} backgroundColor={buttonStyle} />;
};
