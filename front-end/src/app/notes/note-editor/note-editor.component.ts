import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { NoteService }  from '../../core/note.service';
import { Note }         from '../../models/note.model';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './note-editor.component.html',
})
export class NoteEditorComponent implements OnInit {
  note!: Note & { folderId: string };
  isNew = false;
  constructor(
    private route: ActivatedRoute,
    private svc: NoteService,
    private router: Router             
  ) {}

  ngOnInit() {
    const id       = this.route.snapshot.params['id'];
    const folderId = this.route.snapshot.params['folderId'];
    if (id) {
      this.note  = this.svc.getNotes().find(n => n.id === id)!;
      this.isNew = false;
    } else {
      this.note = {
        id: '', title: '', content: '',
        folderId, marked: false,
        createdAt: new Date(), updatedAt: new Date()
      };
      this.isNew = true;
    }
  }

  save() {
    if (this.isNew) {
      this.note.id = crypto.randomUUID();       
  
      this.svc.createNote(this.note);
    } else {
      this.svc.updateNote(this.note as Note);
    }
    this.goBack();
  }
  

  cancel() {
    this.goBack();
  }

  goBack() {
    
    this.router.navigate(['/folders', this.note.folderId]);
  }
}


