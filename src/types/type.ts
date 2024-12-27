export type TTask = {
  id: number;
  date: string;
  startDate: string;
  endDate: string;
  status: string;
  title: string;
  description: string;
  priority: string;
  pinned: boolean;
  subtasks?: { id: number; title: string; completed?: boolean;}[];
};

export type TCalendar = {
  days: TDay[];
  currentDate: {
    month: number;
    year: number;
  };
};

export type TDay = {
  id: string;
  day: number;
  month: number;
  year: number;
  tasks: TTask[];
}
