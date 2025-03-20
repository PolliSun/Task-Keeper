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

  const handleDeleteTask = (id: number) => {
    if (window.confirm("Вы уверены, что хотите удалить эту задачу?")) {
      dispatch(deleteTask(id));
      console.log(id);
      navigate("/");
    }
  };

  const handlePin = useCallback(() => {
    if (taskData) {
      dispatch(
        pinTask({
          taskId: taskData.id,
          currentPinned: taskData.pinned || false,
        })
      );
    }
  }, [dispatch, taskData]);

  const handleSubtaskToggle = useCallback(
    (taskId: number, subtaskId: number, completed: boolean) => {
      const task = tasks.find((t) => t.id === taskId);
      if (task && task.subtasks) {
        dispatch(
          toggleSubtaskStatus({
            taskId,
            subtaskId,
            completed,
            subtasks: task.subtasks,
          })
        );
      }
    },
    [dispatch, tasks]
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
