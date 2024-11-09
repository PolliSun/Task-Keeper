import React, { FC, useEffect, useCallback, memo } from "react";
import { TaskCardUI } from "../ui/task-card/task-card";
import { useDispatch } from "../../services/store";
import { pinTask } from "../../services/slices/taskSlice";
import { TTask } from "../../types/type";

type TaskCardProps = {
  task: TTask;
  onClick: () => void;
};

export const TaskCard: FC<TaskCardProps> = memo(({ task, onClick}) => {
  const dispatch = useDispatch();
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
      onClick={onClick}
      pinned={pinned}
      backgroundColor={buttonStyle}
    />
  );
});
