import { Task, taskService } from "./taskService";
const API_URL = import.meta.env.VITE_API_URL;

export class taskServiceReal implements taskService {
  async getTasks(): Promise<{ data: Task[] }> {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("Пользователь не авторизован");
    }

    const res = await fetch(`${API_URL}/api/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Ошибка при получении задач");
    }

    return { data };
  }

  async getTaskById(id: number): Promise<{ data: Task }> {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("Пользователь не авторизован");
    }

    const res = await fetch(`${API_URL}/api/tasks/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Ошибка при получении задачи");
    }

    return { data };
  }

  async deleteTask(id: number): Promise<{ success: boolean }> {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("Пользователь не авторизован");
    }

    const res = await fetch(`${API_URL}/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Ошибка при удалении задачи");
    }

    return { success: true };
  }

  async createTask(
    task: Omit<Task, "id" | "created_at">
  ): Promise<{ data: Task }> {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("Пользователь не авторизован");
    }

    const res = await fetch(`${API_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Ошибка при удалении задачи");
    }

    return { data: data[0] };
  }

  async updateTask(
    id: number,
    updates: Partial<Task>
  ): Promise<{ data: Task }> {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("Пользователь не авторизован");
    }

    const res = await fetch(`${API_URL}/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Ошибка при редактировании задачи");
    }

    return { data: data[0] };
  }
}
