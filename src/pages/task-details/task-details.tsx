import { FC, useState } from "react";
import { TaskDetailsUI } from "../../components/ui/task-details/task-details";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteTask,
  useGetTaskById,
  useUpdateTask,
} from "../../utils/hooks/useTasks/useTasks";

export const TaskDetails: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: task, isLoading } = useGetTaskById(Number(id));
  const { mutateAsync: deleteTask } = useDeleteTask();
  const { mutateAsync: updateTask } = useUpdateTask();

  const [pinned, setPinned] = useState(task?.data.pinned ?? false);

  const handleDeleteTask = async () => {
    if (!task?.data.id) return;
    if (window.confirm("Вы уверены, что хотите удалить эту задачу?")) {
      await deleteTask(task?.data.id);
      navigate("/");
    }
  };

  const handlePinTask = async () => {
    if (!task?.data.id) return;

    const newPinned = !pinned;
    setPinned(newPinned);

    await updateTask({
      id: task?.data.id,
      updates: { pinned: newPinned },
    });
  };

  const handleEditTask = async () => {
    if (task?.data) {
      navigate(`/task/${task.data.id}/edit`, {
        state: { initialData: task.data },
      });
    }
  };

  const handleTaskComplete = async () => {
    if (!task?.data.id) return;
    await updateTask({
      id: task?.data.id,
      updates: { completed: !task.data.completed },
    });
  };

  const handleSubtaskToggle = async (
    taskId: number,
    subtaskId: number,
    completed: boolean
  ) => {
    if (!task?.data.id || !task.data.subtasks) return;

    const updatedSubtasks = task.data.subtasks.map((subtask) =>
      subtask.id === subtaskId ? { ...subtask, completed } : subtask
    );
    await updateTask({
      id: taskId,
      updates: { subtasks: updatedSubtasks },
    });
  };

  if (isLoading) {
    return <p>Загрузка задачи...</p>;
  }
  if (!task) return <p>Задача не найдена</p>;

  return (
    <TaskDetailsUI
      task={task.data}
      onDelete={handleDeleteTask}
      onTaskComplete={handleTaskComplete}
      onSubtaskToggle={handleSubtaskToggle}
      onPin={handlePinTask}
      onEditTask={handleEditTask}
    />
  );
};
