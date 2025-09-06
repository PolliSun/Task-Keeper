import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Task, taskService } from "../../api/taskService/taskService";

export const useGetTasks = (user_id: string) => {
  return useQuery({
    queryKey: ["tasks", user_id],
    queryFn: async () => await taskService.getTasks(user_id),
    enabled: !!user_id,
  });
};

export const useGetTaskById = (id: number) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: async () => await taskService.getTaskById(id),
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (task: Omit<Task, "id" | "created_at">) =>
      taskService.createTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => taskService.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Task> }) =>
      taskService.updateTask(id, updates),
    onSuccess: (updatedTask, { id }) => {
      queryClient.setQueryData(["task", id], updatedTask);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
