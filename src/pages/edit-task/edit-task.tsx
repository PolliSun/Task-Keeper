import { useNavigate, useParams } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import {
  useGetTaskById,
  useUpdateTask,
} from "../../utils/hooks/useTasks/useTasks";
import { Task } from "../../utils/api/taskService/taskService";
import { useUser } from "../../contexts/UserContext";
import { TaskFormUI } from "../../components/ui/task-form/task-form";
import { useTasksContext } from "../../contexts/TaskContext";

export const EditTask: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: task, isLoading } = useGetTaskById(Number(id));
  const { setSelectedTask } = useTasksContext();
  const { user } = useUser();
  const { mutateAsync: updateTask } = useUpdateTask();
  type FormDataValueType = string | boolean | null;

  const [formData, setFormData] = useState<Omit<Task, "id" | "created_at">>({
    user_id: user?.userId || "",
    title: "",
    description: "",
    start_date: null,
    end_date: null,
    status: "новая",
    priority: "без приоритета",
    subtasks: [],
    pinned: false,
  });

  useEffect(() => {
    if (user?.userId && task?.data) {
      setFormData({
        user_id: user.userId,
        title: task.data.title,
        description: task.data.description,
        start_date: task.data.start_date,
        end_date: task.data.end_date,
        status: task.data.status,
        priority: task.data.priority,
        subtasks: task.data.subtasks || [],
        pinned: task.data.pinned,
      });
    }
  }, [task?.data, user?.userId]);

  const handleInputChange = (field: string, value: FormDataValueType) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubtaskChange = (id: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      subtasks: prev.subtasks?.map((subtask) =>
        subtask.id === id ? { ...subtask, title: value } : subtask
      ),
    }));
  };

  const handleSubmit = async (data: Omit<Task, "id" | "created_at">) => {
    if (!task?.data.id) return;
    await updateTask({
      id: task?.data.id,
      updates: data,
    });
    setSelectedTask({ ...task.data, ...data });
    navigate(-1);
  };

  const handleSubtaskAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const generateFourDigitId = () => Math.floor(1000 + Math.random() * 9000);
    const newSubtask = {
      id: generateFourDigitId(),
      title: "",
      completed: false,
    };

    setFormData((prev) => ({
      ...prev,
      subtasks: [...(prev.subtasks || []), newSubtask],
    }));
  };

  const handleSubtaskDelete = (subtaskId: number, e: React.MouseEvent) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      subtasks: prev.subtasks?.filter((subtask) => subtask.id !== subtaskId),
    }));
  };

  if (isLoading) {
    return <p>Загрузка задачи...</p>;
  }

  return (
    <TaskFormUI
      task={formData}
      isEditing={true}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      onSubtaskAdd={handleSubtaskAdd}
      onSubtaskChange={handleSubtaskChange}
      onSubtaskDelite={handleSubtaskDelete}
    />
  );
};
