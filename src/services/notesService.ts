import { Note } from '../types/noteTypes';

export const createNote = (title: string, content: string): Note => {
  const now = new Date().toISOString();

  return {
    id: Date.now().toString(),
    title,
    content,
    createdAt: now,
    updatedAt: now,
  };
};

export const sortNotes = (notes: Note[]) => {
  return notes.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
};
