import React, { FC, useCallback, memo, useState } from "react";
import { TaskDetailsUI } from "../ui/task-details/task-details";
import { useDispatch } from "../../services/store";
import {
  deliteTask,
  toggleTaskStatus,
  toggleSubtaskStatus,
  pinTask,
} from "../../services/slices/taskSlice";
import { TTask } from "../../types/type";

type TaskDetailsProps = {
  task: TTask;
  onEditTask: () => void;
};

export const TaskDetails: FC<TaskDetailsProps> = memo(
  ({ task, onEditTask}) => {
    const dispatch = useDispatch();
    const [status, setStatus] = useState(task.status || "в работе");

    const handleDeleteTask = useCallback(
      (id: number) => {
        dispatch(deliteTask(id));
      },
      [dispatch]
    );

    const handlePin = useCallback(() => {
      dispatch(pinTask(task.id));
    }, [dispatch, task.id]);

    const handleSubtaskToggle = useCallback(
      (taskId: number, subtaskId: number, completed: boolean) => {
        dispatch(toggleSubtaskStatus({ taskId, subtaskId, completed }));
      },
      [dispatch]
    );

    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newStatus = e.target.value;
      setStatus(newStatus);
      dispatch(toggleTaskStatus({ taskId: task.id, newStatus }));
    };

    if (!task) return null;

    return (
      <TaskDetailsUI
        task={task}
        onDelete={handleDeleteTask}
        onStatusChange={handleStatusChange}
        onToggle={handleSubtaskToggle}
        onPin={handlePin}
        onEditTask={onEditTask}
      />
    );
  }
);
