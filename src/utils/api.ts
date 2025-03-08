import { TTask } from "../types/type";

export const fetchTasksFromAPI = async (): Promise<TTask[]> => {
  const response = await fetch(`${import.meta.env.VITE_APP_URL}/tasks`);
  if (!response.ok) {
    throw new Error("Не удалось загрузить задачи");
  }
  return response.json();
};

export const saveTaskToAPI = async (task: Partial<TTask>): Promise<TTask> => {
  const response = await fetch(`${import.meta.env.VITE_APP_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error("Не удалось сохранить задачу");
  }
  return response.json();
};

export const updateTaskInAPI = async (task: TTask): Promise<TTask> => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_URL}/tasks/${task.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }
  );

  if (!response.ok) {
    throw new Error("Не удалось обновить задачу");
  }

  return response.json();
};

export const deleteTaskFromAPI = async (taskId: number): Promise<void> => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_URL}/tasks/${taskId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Не удалось удалить задачу");
  }
};
