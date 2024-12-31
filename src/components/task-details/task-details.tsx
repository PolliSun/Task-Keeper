import React, { FC, useCallback, memo, useState } from "react";
import { TaskDetailsUI } from "../ui/task-details/task-details";
import { useDispatch } from "../../services/store";
import { RootState, useSelector } from "../../services/store";
import {
  deliteTask,
  toggleTaskStatus,
  toggleSubtaskStatus,
  pinTask,
  editTask,
} from "../../services/slices/taskSlice";
import { TTask } from "../../types/type";
import { useParams, useNavigate } from "react-router-dom";

export const TaskDetails: FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const taskData = tasks.find((i) => i.id === parseInt(id || ""));
  const dispatch = useDispatch();
  const [status, setStatus] = useState(taskData?.status || "в работе");

  const handleDeleteTask = useCallback(
    (id: number) => {
      dispatch(deliteTask(id));
    },
    [dispatch]
  );

  const handlePin = useCallback(() => {
    if (taskData) {
      dispatch(pinTask(taskData.id));
    }
  }, [dispatch, taskData]);

  const handleSubtaskToggle = useCallback(
    (taskId: number, subtaskId: number, completed: boolean) => {
      dispatch(toggleSubtaskStatus({ taskId, subtaskId, completed }));
    },
    [dispatch]
  );

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    if (taskData) {
      dispatch(toggleTaskStatus({ taskId: taskData.id, newStatus }));
    }
  };

  const handleEditTask = useCallback(() => {
    if (taskData) {
      navigate(`/task/${taskData.id}/edit`, { state: { initialData: taskData } });
    }
  }, [navigate, taskData]);

  if (!taskData) return <p>Задача не найдена</p>;

  return (
    <TaskDetailsUI
      task={taskData}
      onDelete={handleDeleteTask}
      onStatusChange={handleStatusChange}
      onToggle={handleSubtaskToggle}
      onPin={handlePin}
      onEditTask={handleEditTask}
    />
  );
};
