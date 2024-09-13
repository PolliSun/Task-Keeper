import { TNote } from '../types/type';

export const getNotesFromStorage = (): TNote[] => {
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
};

export const saveNotesToStorage = (notes: TNote[]): void => {
    localStorage.setItem('notes', JSON.stringify(notes));
}