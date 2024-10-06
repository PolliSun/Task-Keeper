import { TTask } from '../types/type';

export const getTasksFromStorage = (): TTask[]  => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
};

export const saveTasksToStorage = (tasks: TTask[]): void => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}