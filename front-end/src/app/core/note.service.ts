import { Injectable } from '@angular/core';
import { Folder } from './models/folder.model';
import { Note }   from './models/note.model';

@Injectable({ providedIn: 'root' })
export class NoteService {
  /* —————————— демо-хранилище в памяти —————————— */
  private folders: Folder[] = [];
  private notes:   Note[]   = [];

  /* =====  Папки  ===== */
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
    this.notes   = this.notes.filter(n => n.folderId !== id);
    this.folders = this.folders.filter(f => f.id !== id);
  }

  /* =====  Заметки  ===== */
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
}


