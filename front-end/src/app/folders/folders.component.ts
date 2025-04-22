// src/app/folders/folders.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NoteService } from '../core/note.service';
import { Folder } from '../core/models/folder.model';

@Component({
  selector: 'app-folders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './folders.component.html'
})
export class FoldersComponent implements OnInit {
  folders: Folder[] = [];
  constructor(private svc: NoteService) {}
  ngOnInit() { this.folders = this.svc.getFolders(); }
  newFolder() {
    const name = prompt('Folder name:');
    if (name) this.svc.createFolder({ id: crypto.randomUUID(), name });
    this.folders = this.svc.getFolders();
  }
}
