import { TCalendar } from '../types/type';

export const getCalendarFromStorage = ():TCalendar => {
    const calendar = localStorage.getItem('calendar');
    return calendar ? JSON.parse(calendar) : { month: new Date().getMonth(), year: new Date().getFullYear() };
};

export const saveCalendarToStorage = (calendar: TCalendar): void => {
    localStorage.setItem('calendar', JSON.stringify(calendar))
}