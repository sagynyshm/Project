import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NoteService } from '../core/note.service';
import { Folder } from '../models/folder.model';

@Component({
  selector: 'app-folders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './folders.component.html'
})
export class FoldersComponent implements OnInit {
  folders: Folder[] = [];

  constructor(private svc: NoteService) {}

  ngOnInit() { this.load(); }

  /* ——— CRUD ——— */
  newFolder() {
    const name = prompt('Folder name:')?.trim();
    if (name) {
      this.svc.createFolder({ id: crypto.randomUUID(), name });
      this.load();
    }
  }

  rename(id: string, current: string) {
    const newName = prompt('New folder name:', current)?.trim();
    if (newName) {
      this.svc.renameFolder(id, newName);
      this.load();
    }
  }

  remove(id: string) {
    if (confirm('Delete this folder and all notes?')) {
      this.svc.deleteFolder(id);
      this.load();
    }
  }

  /* ——— helper ——— */
  private load() {
    this.folders = this.svc.getFolders();
  }
}
