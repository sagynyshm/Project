import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NoteService } from '../../core/note.service';
import { Note } from '../../core/models/note.model';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notes-list.component.html'
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [];
  folderId!: string;

  showCompleted = true;

  constructor(
    private route: ActivatedRoute,
    private svc: NoteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.folderId = this.route.snapshot.params['id'];
    this.load();
  }

  toggleFilter(): void {
    this.showCompleted = !this.showCompleted;
  }

  load(): void {
    this.notes = this.svc.getNotesByFolder(this.folderId);
  }

  toggleMark(id: string): void {
    this.svc.toggleMarkNote(id);
    this.load();
  }

  delete(id: string): void {
    this.svc.deleteNote(id);
    this.load();
  }

  createNote(): void {
    this.router.navigate(['/note/new', this.folderId]);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
