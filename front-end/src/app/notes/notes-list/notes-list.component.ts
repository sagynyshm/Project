// src/app/notes/notes-list/notes-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NoteService } from '../../core/note.service';
import { Note } from '../../core/models/note.model';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notes-list.component.html',
  styles: [`
    .marked { color: gold; cursor: pointer; }
  `]
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [];
  folderId!: string;
  constructor(private route: ActivatedRoute, private svc: NoteService, private router: Router) {}

  ngOnInit() {
    this.folderId = this.route.snapshot.params['id'];
    this.load();
  }
  load() {
    this.notes = this.svc.getNotesByFolder(this.folderId);
  }
  toggleMark(id: string) { this.svc.toggleMarkNote(id); this.load(); }
  delete(id: string) { this.svc.deleteNote(id); this.load(); }
  createNote() { this.router.navigate(['/note/new', this.folderId]); }
  goBack() { this.router.navigate(['/']); }
}
