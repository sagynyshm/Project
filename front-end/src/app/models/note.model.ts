// src/app/models/note.model.ts
export interface Note {
  id: string;
  folderId: string;
  title: string;
  content: string;
  marked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface User {
  id: number;
  username: string;
  email: string;
}

export interface TaskStatus {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

