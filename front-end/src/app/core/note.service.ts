import { Injectable } from '@angular/core';
import { Note } from './models/note.model';
import { Folder } from './models/folder.model';
import { v4 as uuid } from 'uuid';

@Injectable({ providedIn: 'root' })
export class NoteService {
  private NOTES_KEY = 'TASK_MANAGER_NOTES';
  private FOLDERS_KEY = 'TASK_MANAGER_FOLDERS';

  constructor() {
    if (!this.getFolders().length) {
      this.createFolder({ id: uuid(), name: 'General' });
    }
  }


  getFolders(): Folder[] {
    return JSON.parse(localStorage.getItem(this.FOLDERS_KEY) || '[]');
  }
  createFolder(folder: Folder) {
    const all = this.getFolders();
    all.push(folder);
    localStorage.setItem(this.FOLDERS_KEY, JSON.stringify(all));
  }

  // — Notes CRUD —
  getNotes(): Note[] {
    return JSON.parse(localStorage.getItem(this.NOTES_KEY) || '[]')
      .map((n: any) => ({ ...n, createdAt: new Date(n.createdAt), updatedAt: new Date(n.updatedAt) }));
  }
  getNotesByFolder(folderId: string): Note[] {
    return this.getNotes().filter(n => n.folderId === folderId);
  }
  createNote(note: Partial<Note>) {
    const all = this.getNotes();
    const newNote: Note = {
      id: uuid(),
      title: note.title || '',
      content: note.content || '',
      folderId: note.folderId!,
      marked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    all.push(newNote);
    localStorage.setItem(this.NOTES_KEY, JSON.stringify(all));
  }
  updateNote(note: Note) {
    let all = this.getNotes();
    all = all.map(n => n.id === note.id ? { ...note, updatedAt: new Date() } : n);
    localStorage.setItem(this.NOTES_KEY, JSON.stringify(all));
  }
  deleteNote(id: string) {
    const all = this.getNotes().filter(n => n.id !== id);
    localStorage.setItem(this.NOTES_KEY, JSON.stringify(all));
  }
  toggleMarkNote(id: string) {
    const all = this.getNotes().map(n => n.id === id ? { ...n, marked: !n.marked, updatedAt: new Date() } : n);
    localStorage.setItem(this.NOTES_KEY, JSON.stringify(all));
  }
}
