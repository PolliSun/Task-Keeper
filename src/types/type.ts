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
  title: string;
  status: boolean;
  priority?: "high" | "medium" | "low" | "none";
};

export type TCalendar = {
  month: number;
  year: number;
};
