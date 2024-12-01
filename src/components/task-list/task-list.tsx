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
  const [visibleSelectedDay, setVisibleSelectedDay] = useState(false);

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
  const isDaySelected = (dayId: string) => selectedDayId === dayId;

  const filteredDataTasks = useMemo(() => {
    if (!selectedDay) return [];

    const selectedDate = new Date(
      selectedDay.year,
      selectedDay.month,
      selectedDay.day
    );

    return tasks.filter((task) => {
      const taskStartDate = new Date(task.startDate);
      const taskEndDate = new Date(task.endDate);
      const taskDate = new Date(task.date);

      return (
        taskStartDate.toDateString() === selectedDate.toDateString() ||
        taskEndDate.toDateString() === selectedDate.toDateString() ||
        taskDate.toDateString() === selectedDate.toDateString() ||
        (selectedDate >= taskStartDate && selectedDate <= taskEndDate) ||
        selectedDate === taskDate
      );
    });
  }, [tasks, selectedDay]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "выполнен"
  ).length;

  const title = useMemo(() => {
    if (isSearching) {
      return searchResults.length > 0
        ? `Найдено задач: ${searchResults.length} из ${totalTasks}`
        : "Задачи по вашему запросу не найдены.";
    }
    if (isFavoritesVisible) {
      const favoriteTasks = tasks.filter((task) => task.pinned).length;
      return `Избранные задачи: ${favoriteTasks} из ${totalTasks}`;
    }
    if (isCalendarVisible) {
      return "Календарь";
    }
    if (tasks.length === 0) {
      return "Сейчас у вас нет задач, давайте создадим их!";
    }
    return `Ваши задачи: ${completedTasks} / ${totalTasks}`;
  }, [
    isSearching,
    isFavoritesVisible,
    isCalendarVisible,
    searchResults,
    tasks,
    totalTasks,
  ]);

  const titleData = useMemo(() => {
    if (showEditForm) return "Редактирование задачи:";
    if (selectedTask) return "Детали задачи:";
    if (showCreateForm) return "Создание задачи:";
    if (selectedDay && visibleSelectedDay) {
      if (filteredDataTasks.length === 0) {
        return `Задачи за выбранный день: ${selectedDay.day}.${selectedDay.month}.${selectedDay.year} отсутствуют.`;
      }
      return `Задачи за выбранный день: ${selectedDay.day}.${selectedDay.month}.${selectedDay.year} г.`;
    }
    return "Выберите задачу для просмотра или создайте новую!";
  }, [
    showEditForm,
    selectedTask,
    showCreateForm,
    selectedDay,
    visibleSelectedDay,
    filteredDataTasks,
  ]);

  const handleSelectTask = (id: string) => {
    setSelectedTaskId(id);
    setShowCreateForm(false);
    setIsCreateActive(false);
    setIsFavoritesVisible(false);
    setShowEditForm(false);
  };

  const handleSelectDay = (id: string) => {
    setSelectedDayId(id);
    setVisibleSelectedDay(true);
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
    setSelectedDayId(null);
    setShowCreateForm(false);
    setIsCreateActive(false);
    setShowEditForm(false);
    setVisibleSelectedDay(false);
  };

  const handleFavoritesClick = () => {
    setIsFavoritesVisible((prev) => !prev);
    setIsCalendarVisible(false);
  };

  const handleCalendarClick = () => {
    setIsCalendarVisible((prev) => !prev);
    setSelectedDayId(null);
    setIsFavoritesVisible(false);
    setVisibleSelectedDay(false);
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
    : isCalendarVisible
    ? []
    : tasks;

  const displayedTasks = isCalendarVisible ? [] : filteredTasks;

  // const filteredTasks = selectedDay
  // ? tasks.filter(task => task.id === selectedDay.id)
  // : tasks;

  

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
        title={title}
        titleData={titleData}
        tasks={isSearching ? searchResults : displayedTasks}
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
        isDaySelected={isDaySelected}
        visibleSelectedDay={visibleSelectedDay}
      />
    </>
  );
};
