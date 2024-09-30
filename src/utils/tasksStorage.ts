import { TToDo } from '../types/type';

export const getTasksFromStorage = (): TToDo[]  => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
};

export const saveTasksToStorage = (tasks: TToDo[]): void => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}