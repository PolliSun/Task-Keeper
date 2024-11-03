export type TTask = {
  id: string;
  date: string;
  startDate?: string;
  endDate?: string;
  title: string;
  status: boolean;
  priority: string;
  isPinned?: boolean;
  subtasks?: { id: string; title: string}[];
};

export type TCalendar = {
  month: number;
  year: number;
};
