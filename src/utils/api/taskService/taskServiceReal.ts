import { supabase } from "../../serviceFuncs/supabaseClient";
import { Task, taskService } from "./taskService";

export class taskServiceReal implements taskService {
  async getTasks(user_id: string): Promise<{ data: Task[] }> {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user_id);

    if (error) {
      throw new Error(error.message || "Ошибка при получении задач");
    }

    return { data: data || [] };
  }

  async createTask(
    task: Omit<Task, "id" | "created_at">
  ): Promise<{ data: Task }> {
    const { data, error } = await supabase
      .from("tasks")
      .insert([task])
      .select();

    if (error) {
      throw new Error(error.message || "Ошибка при создании задачи");
    }

    return { data: data[0] };
  }

  async getTaskById(id: number): Promise<{ data: Task }> {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message || "Ошибка: задача не найдена");
    }

    return { data };
  }

  async deleteTask(id: number): Promise<{ success: boolean }> {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      throw new Error(error.message || "Ошибка удаления задачи");
    }

    return { success: true };
  }

  async updateTask(
    id: number,
    updates: Partial<Task>
  ): Promise<{ data: Task }> {
    const { data, error } = await supabase
      .from("tasks")
      .update(updates)
      .eq("id", id)
      .select();

    if (error) {
      throw new Error(error.message || "Ошибка редактирования задачи");
    }

    return { data: data[0] };
  }
}
