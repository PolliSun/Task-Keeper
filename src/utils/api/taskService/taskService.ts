import { taskServiceReal } from "./taskServiceReal";

export type Task = {
  user_id: string;
  id: number;
  created_at: string;
  start_date: string | null;
  end_date: string | null;
  status: string;
  title: string;
  description: string;
  priority: string;
  pinned: boolean;
  archived: boolean;
  subtasks?: Subtask[];
  tags?: string[];
};

export type Subtask = {
  id: number;
  title: string;
  completed: boolean;
};

export interface taskService {
  getTasks: () => Promise<{ data: Task[] }>;
  getTaskById: (id: number) => Promise<{ data: Task }>;
  createTask: (
    task: Omit<Task, "id" | "created_at">
  ) => Promise<{ data: Task }>;
  deleteTask: (id: number) => Promise<{ success: boolean }>;
  updateTask: (id: number, updates: Partial<Task>) => Promise<{ data: Task }>;
}

export const taskService = new taskServiceReal();
