export type TNote = {
  id: string;
  title: string;
  content: string;
  date: string;
  image: string;
  isPinned?: boolean;
};

export type TTask = {
  id: string;
  date: string;
  title: string;
  timer: number;
  remainingTime: number;
  status: boolean;
  priority: "высокий" | "средний" | "низкий" | "без приоритета";
};

export type TCalendar = {
  month: number;
  year: number;
};
