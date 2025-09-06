import { FC, useEffect } from "react";
import { TaskDetailsUI } from "../../components/ui/task-details/task-details";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteTask,
  useGetTaskById,
  useUpdateTask,
} from "../../utils/hooks/useTasks/useTasks";
import { useTasksContext } from "../../contexts/TaskContext";

export const TaskDetails: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedTask, setSelectedTask } = useTasksContext();
  const taskId = Number(id);

  const task = selectedTask?.id === taskId ? selectedTask : null;
  const { data: fetchedTask, isLoading } = useGetTaskById(taskId);
  const { mutateAsync: deleteTask } = useDeleteTask();
  const { mutateAsync: updateTask } = useUpdateTask();

  const currentTask = task || fetchedTask?.data || null;

  useEffect(() => {
    if (fetchedTask && fetchedTask.data && !selectedTask) {
      setSelectedTask(fetchedTask.data);
    }
  }, [fetchedTask, selectedTask, setSelectedTask]);

  const handleDeleteTask = async () => {
    if (!currentTask?.id) return;
    if (window.confirm("Вы уверены, что хотите удалить эту задачу?")) {
      await deleteTask(currentTask.id);
      setSelectedTask(null);
      navigate("/");
    }
  };

  const handlePinTask = async () => {
    if (!currentTask?.id) return;
    const newPinned = !currentTask.pinned;
    await updateTask({
      id: currentTask.id,
      updates: { pinned: newPinned },
    });
    setSelectedTask({ ...currentTask, pinned: newPinned });
  };

  const handleArchivedTask = async () => {
    if (!currentTask?.id) return;
    const newArchive = !currentTask.archived;
    await updateTask({
      id: currentTask.id,
      updates: { archived: newArchive },
    });
    setSelectedTask({ ...currentTask, archived: newArchive });
  };

  const handleEditTask = async () => {
    if (currentTask) {
      navigate(`/task/${currentTask.id}/edit`, {
        state: { initialData: currentTask },
      });
    }
  };

  const handleSubtaskToggle = async (subtaskId: number, completed: boolean) => {
    if (!currentTask?.id || !currentTask.subtasks) return;

    const updatedSubtasks = currentTask.subtasks.map((subtask) =>
      subtask.id === subtaskId ? { ...subtask, completed } : subtask
    );
    await updateTask({
      id: currentTask.id,
      updates: { subtasks: updatedSubtasks },
    });
    setSelectedTask({ ...currentTask, subtasks: updatedSubtasks });
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!currentTask?.id) return;
    await updateTask({
      id: currentTask.id,
      updates: { status: newStatus },
    });
    setSelectedTask({ ...currentTask, status: newStatus });
  };

  if (isLoading) {
    return <p>Загрузка задачи...</p>;
  }
  if (!currentTask) return <p>Задача не найдена</p>;

  return (
    <TaskDetailsUI
      task={currentTask}
      onDelete={handleDeleteTask}
      onSubtaskToggle={handleSubtaskToggle}
      onPin={handlePinTask}
      onEditTask={handleEditTask}
      onStatusSelect={handleStatusChange}
      onArchived={handleArchivedTask}
    />
  );
};
