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
  priority: "high" | "medium" | "low" | "none";
  isPinned?: boolean;
};

export type TCalendar = {
  month: number;
  year: number;
};
