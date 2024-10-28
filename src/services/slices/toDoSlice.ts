import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TTask } from "../../types/type";
import {
  saveTasksToStorage,
  getTasksFromStorage,
} from "../../utils/tasksStorage";

interface TaskState {
  tasks: TTask[];
}

const initialState: TaskState = {
  tasks: getTasksFromStorage(),
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<TTask[]>) {
      state.tasks = action.payload;
      saveTasksToStorage(state.tasks);
    },
    addTask(state, action: PayloadAction<TTask>) {
      state.tasks.push(action.payload);
      saveTasksToStorage(state.tasks);
    },
    deliteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter(
        (tasks) => tasks.id !== action.payload
      );
      saveTasksToStorage(state.tasks);
    },
    toggleTaskStatus(state, action: PayloadAction<string>) {
      const task = state.tasks.find(task => task.id === action.payload);
      if(task) {
        task.status = !task.status;
        saveTasksToStorage(state.tasks);
      }
    },
    updateRemainingTime(state, action: PayloadAction<{ id: string; remainingTime: number}>) {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if(task) {
        task.remainingTime = action.payload.remainingTime;
        saveTasksToStorage(state.tasks);
      }
    }
  },
});

export const { setTasks, addTask, deliteTask, toggleTaskStatus, updateRemainingTime } = taskSlice.actions;
export default taskSlice.reducer;
