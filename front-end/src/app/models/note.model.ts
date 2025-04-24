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
