import React, { FC, useMemo, useState } from "react";
import { TasksListUI } from "../ui/pages/tasks-list/tasks-list";
import { RootState, useSelector, useDispatch } from "../../services/store";
import { addTask, editTask } from "../../services/slices/taskSlice";
import { TDay, TTask } from "../../types/type";
import { TaskHeader } from "../task-header/task-header";

type TaskListProps = {
  tasks: TTask[];
  days: TDay[];
};

export const TaskList: FC<TaskListProps> = ({ tasks, days }) => {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isCreateActive, setIsCreateActive] = useState(false);
  const [isFavoritesVisible, setIsFavoritesVisible] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const searchResults = useSelector(
    (state: RootState) => state.tasks.searchResults
  );
  const isSearching = useSelector(
    (state: RootState) => state.tasks.isSearching
  );
  const dispatch = useDispatch();

  const selectedTask = tasks.find((task) => task.id === selectedTaskId) || null;
  const isTaskSelected = (taskId: string) => selectedTaskId === taskId;

  const selectedDay = days.find((day) => day.id === selectedDayId) || null;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "выполнен"
  ).length;

  const handleSelectTask = (id: string) => {
    setSelectedTaskId(id);
    setShowCreateForm(false);
    setIsCreateActive(false);
    setIsFavoritesVisible(false);
    setShowEditForm(false);
  };

  const handleSelectDay = (id: string) => {
    setSelectedDayId(id);
    setShowCreateForm(false);
    setIsCreateActive(false);
    setIsFavoritesVisible(false);
    setSelectedTaskId(null);
  };

  const handleCreateTaskClick = () => {
    setIsCreateActive((prev) => {
      const newState = !prev;
      setShowCreateForm(newState);
      return newState;
    });
    setSelectedTaskId(null);
    setShowEditForm(false);
  };

  const handleSaveTaskSubmit = (newTask: TTask) => {
    dispatch(addTask(newTask));
    setShowCreateForm(false);
    setIsCreateActive(false);
  };

  const handleCloseTask = () => {
    setSelectedTaskId(null);
    setShowCreateForm(false);
    setIsCreateActive(false);
    setShowEditForm(false);
  };

  const handleFavoritesClick = () => {
    setIsFavoritesVisible((prev) => !prev);
    setIsCalendarVisible(false);
  };

  const handleCalendarClick = () => {
    setIsCalendarVisible((prev) => !prev);
    setSelectedTaskId(null);
    setIsFavoritesVisible(false);
  };

  const handleEditClick = () => {
    setShowEditForm((prev) => !prev);
  };

  const handleEditSubmit = (updatedTask: TTask) => {
    dispatch(editTask(updatedTask));
    setShowEditForm(false);
    setSelectedTaskId(updatedTask.id);
  };

  const filteredTasks = isFavoritesVisible
    ? tasks.filter((task) => task.pinned)
    : isCalendarVisible ? [] 
    : tasks;

  const displayedTasks = isCalendarVisible ? [] : filteredTasks;

  // const filteredTasks = selectedDay 
  // ? tasks.filter(task => task.id === selectedDay.id) 
  // : tasks;

  const filteredDataTasks = useMemo(() => {
    if (!selectedDay) return [];
  
    const selectedDate = new Date(
      selectedDay.year, 
      selectedDay.month, 
      selectedDay.day
    );
  
    return tasks.filter(task => {
      const taskStartDate = new Date(task.startDate);
      const taskEndDate = new Date(task.endDate);
  
      return (
        (taskStartDate.toDateString() === selectedDate.toDateString()) ||
        (taskEndDate.toDateString() === selectedDate.toDateString()) ||
        (selectedDate >= taskStartDate && selectedDate <= taskEndDate)
      );
    });
  }, [tasks, selectedDay]);

  return (
    <>
      <TaskHeader
        onCreateTask={handleCreateTaskClick}
        isCreateActive={isCreateActive}
        onFavoritesClick={handleFavoritesClick}
        isFavoritesVisible={isFavoritesVisible}
        onCalendarClick={handleCalendarClick}
        isCalendarVisible={isCalendarVisible}
      />
      <TasksListUI
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        title={
          isSearching && searchResults.length === 0
            ? "Нет задач по вашему запросу."
            : isSearching && searchResults.length > 0
            ? "Задачи по вашему запросу:"
            : tasks.length === 0
            ? "Сейчас у вас нет задач, давайте создадим их!"
            : isCalendarVisible
            ? "Календарь"
            : isFavoritesVisible
            ? "Избранные задачи"
            : "Ваши задачи:"
        }
        titleData={
          showEditForm
            ? "Редактирование задачи:"
            : selectedTask
            ? "Детали задачи:"
            : showCreateForm
            ? "Создание задачи:"
            : selectedDay
            ? `Текущие задачи на ${selectedDay.day}.${selectedDay.month + 1}.${selectedDay.year}`
            : "Выберите задачу для просмотра или создайте новую!"
        }
        tasks={isSearching ? searchResults : filteredTasks}
        selectedTask={selectedTask}
        isTaskSelected={isTaskSelected}
        onTaskSelect={handleSelectTask}
        onCreateTask={handleSaveTaskSubmit}
        createdTask={showCreateForm}
        onClose={handleCloseTask}
        editedTask={showEditForm}
        onEditTask={handleEditSubmit}
        handleEditClick={handleEditClick}
        visibleCalendar={isCalendarVisible}
        onDaySelect={handleSelectDay}
        selectedDay={selectedDay}
        filteredDataTasks={filteredDataTasks}
      />
    </>
  );
};
