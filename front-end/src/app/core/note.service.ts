// import { Injectable } from '@angular/core';
// import { Note } from './models/note.model';
// import { Folder } from './models/folder.model';
// import { v4 as uuid } from 'uuid';

// @Injectable({ providedIn: 'root' })
// export class NoteService {
//   private NOTES_KEY = 'TASK_MANAGER_NOTES';
//   private FOLDERS_KEY = 'TASK_MANAGER_FOLDERS';

//   constructor() {
//     if (!this.getFolders().length) {
//       this.createFolder({ id: uuid(), name: 'General' });
//     }
//   }


//   getFolders(): Folder[] {
//     return JSON.parse(localStorage.getItem(this.FOLDERS_KEY) || '[]');
//   }
//   createFolder(folder: Folder) {
//     const all = this.getFolders();
//     all.push(folder);
//     localStorage.setItem(this.FOLDERS_KEY, JSON.stringify(all));
//   }

//   // — Notes CRUD —
//   getNotes(): Note[] {
//     return JSON.parse(localStorage.getItem(this.NOTES_KEY) || '[]')
//       .map((n: any) => ({ ...n, createdAt: new Date(n.createdAt), updatedAt: new Date(n.updatedAt) }));
//   }
//   getNotesByFolder(folderId: string): Note[] {
//     return this.getNotes().filter(n => n.folderId === folderId);
//   }
//   createNote(note: Partial<Note>) {
//     const all = this.getNotes();
//     const newNote: Note = {
//       id: uuid(),
//       title: note.title || '',
//       content: note.content || '',
//       folderId: note.folderId!,
//       marked: false,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };
//     all.push(newNote);
//     localStorage.setItem(this.NOTES_KEY, JSON.stringify(all));
//   }
//   updateNote(note: Note) {
//     let all = this.getNotes();
//     all = all.map(n => n.id === note.id ? { ...note, updatedAt: new Date() } : n);
//     localStorage.setItem(this.NOTES_KEY, JSON.stringify(all));
//   }
//   deleteNote(id: string) {
//     const all = this.getNotes().filter(n => n.id !== id);
//     localStorage.setItem(this.NOTES_KEY, JSON.stringify(all));
//   }
//   toggleMarkNote(id: string) {
//     const all = this.getNotes().map(n => n.id === id ? { ...n, marked: !n.marked, updatedAt: new Date() } : n);
//     localStorage.setItem(this.NOTES_KEY, JSON.stringify(all));
//   }
// }


import { Injectable } from '@angular/core';
import { Folder } from '../models/folder.model';
import { Note } from '../models/note.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id?: number;
  title: string;
  description?: string;
  due_date?: string;
  status?: string | number;
  category?: string | number;
  created_at?: string;
  updated_at?: string;
}

@Injectable({ providedIn: 'root' })
export class NoteService {
  private folders: Folder[] = [];
  private notes: Note[] = [];
  private readonly API_URL = 'http://localhost:8000/api/tasks/';

  constructor(private http: HttpClient) {}

  getFolders(): Folder[] {
    return [...this.folders];
  }

  createFolder(folder: Folder) {
    this.folders.push(folder);
  }

  renameFolder(id: string, newName: string) {
    const f = this.folders.find(f => f.id === id);
    if (f) f.name = newName;
  }

  deleteFolder(id: string) {
    this.notes = this.notes.filter(n => n.folderId !== id);
    this.folders = this.folders.filter(f => f.id !== id);
  }

  getNotes(): Note[] {
    return [...this.notes];
  }

  getNotesByFolder(folderId: string): Note[] {
    return this.notes.filter(n => n.folderId === folderId);
  }

  createNote(note: Note) {
    this.notes.push(note);
  }

  updateNote(note: Note) {
    const idx = this.notes.findIndex(n => n.id === note.id);
    if (idx !== -1) this.notes[idx] = note;
  }

  deleteNote(id: string) {
    this.notes = this.notes.filter(n => n.id !== id);
  }

  toggleMarkNote(id: string) {
    const n = this.notes.find(n => n.id === id);
    if (n) n.marked = !n.marked;
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('TASK_MANAGER_TOKEN');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.API_URL, { headers: this.getAuthHeaders() });
  }

  createTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(this.API_URL, task, { headers: this.getAuthHeaders() });
  }

  updateTask(id: number, task: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.API_URL}${id}/`, task, { headers: this.getAuthHeaders() });
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}${id}/`, { headers: this.getAuthHeaders() });
  }
}

