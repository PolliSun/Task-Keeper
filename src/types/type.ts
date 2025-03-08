export type TTask = {
  id: number;
  created_at: string;
  completed: boolean;
  start_date: string;
  end_date: string;
  status: "просрочена" | "выполнена" | "в работе";
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
  isToday: boolean;
}
