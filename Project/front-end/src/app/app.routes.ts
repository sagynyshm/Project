import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { FoldersComponent } from './folders/folders.component';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { NoteEditorComponent } from './notes/note-editor/note-editor.component';
import { inject } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

const authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isAuthenticated()) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: FoldersComponent, canActivate: [authGuard] },
  { path: 'folders/:id', component: NotesListComponent, canActivate: [authGuard] },
  { path: 'note/new/:folderId', component: NoteEditorComponent, canActivate: [authGuard] },
  { path: 'note/edit/:id', component: NoteEditorComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
