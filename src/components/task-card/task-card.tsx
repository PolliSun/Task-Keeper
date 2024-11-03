import React, { FC, useEffect, useCallback, memo } from "react";
import { TaskCardUI } from "../ui/task-card/task-card";
import { useDispatch } from "../../services/store";
import { toggleTaskStatus, pinTask } from "../../services/slices/taskSlice";
import { TTask } from "../../types/type";

type TaskCardProps = {
  task: TTask;
  onClick: () => void;
};

export const TaskCard: FC<TaskCardProps> = memo(({task, onClick}) => {
  const dispatch = useDispatch();

  const handleToggle = useCallback(() => {
    dispatch(toggleTaskStatus(task.id));
  }, [dispatch, task.id]);

  const handlePin = useCallback(() => {
    dispatch(pinTask(task.id));
  }, [dispatch, task.id]);

  if (!task) return null;

  return (
    <TaskCardUI
      task={task}
      onToggle={handleToggle}
      onClick={onClick}
      onPin={handlePin}
    />
  );
});
