import React, { FC, memo } from "react";
import { TaskCardUI } from "../ui/task-card/task-card";
import { TTask } from "../../types/type";

type TaskCardProps = {
  task: TTask;
  onClickTask: () => void;
  isTaskSelected: (taskId: string) => boolean;
};

export const TaskCard: FC<TaskCardProps> = memo(({ task, onClickTask, isTaskSelected}) => {
  const pinned = task.pinned ? "избранный" : null;

  let buttonStyle = "";
  if (pinned === "избранный") {
    buttonStyle = "#f7acea";
  }

  if (!task) return null;

  return (
    <TaskCardUI
      task={{
        ...task,
        status: task.status || "в работе",
      }}
      onClickTask={onClickTask}
      pinned={pinned}
      backgroundColor={buttonStyle}
      isTaskSelected={isTaskSelected}
    />
  );
});
