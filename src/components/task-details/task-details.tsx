import { FC, useCallback } from "react";
import { TaskDetailsUI } from "../ui/task-details/task-details";
import { useDispatch } from "../../services/store";
import { RootState, useSelector } from "../../services/store";
import {
  deleteTask,
  toggleTaskCompletion,
  toggleSubtaskStatus,
  pinTask,
} from "../../services/slices/taskSlice";
import { useParams, useNavigate } from "react-router-dom";

export const TaskDetails: FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const taskData = tasks.find((i) => i.id === parseInt(id || ""));
  const dispatch = useDispatch();

  console.log(taskData?.status);

  const handleDeleteTask = useCallback(
    (id: number) => {
      dispatch(deleteTask(id));
      navigate("/");
    },
    [dispatch, navigate]
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

  const handleTaskComplete = useCallback(
    (taskId: number, completed: boolean) => {
      dispatch(toggleTaskCompletion({ taskId, completed }));
    },
    [dispatch]
  );

  const handleEditTask = useCallback(() => {
    if (taskData) {
      navigate(`/task/${taskData.id}/edit`, {
        state: { initialData: taskData },
      });
    }
  }, [navigate, taskData]);

  if (!taskData) return <p>Задача не найдена</p>;

  return (
    <TaskDetailsUI
      task={taskData}
      onDelete={handleDeleteTask}
      onTaskComplete={handleTaskComplete}
      onToggle={handleSubtaskToggle}
      onPin={handlePin}
      onEditTask={handleEditTask}
    />
  );
};
