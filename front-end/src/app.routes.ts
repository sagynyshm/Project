import { Routes } from '@angular/router';
import { LoginComponent }    from './app/auth/login/login.component';
import { RegisterComponent } from './app/auth/sign in/register.component';
import { FoldersComponent }  from './app/folders/folders.component';
import { NotesListComponent} from './app/notes/notes-list/notes-list.component';
import { NoteEditorComponent } from './app/notes/note-editor/note-editor.component';
import { inject }           from '@angular/core';
import { AuthService }      from './app/auth/auth.service';
import { Router }           from '@angular/router';

const authGuard = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);
  if (auth.isAuthenticated()) return true;
  router.navigateByUrl('/login');
  return false;
};

export const routes: Routes = [
  // при заходе на / сразу редиректим на логин
  { path: '',        redirectTo: '/login', pathMatch: 'full' },

  { path: 'login',    component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // защищённые маршруты
  { path: 'folders',           component: FoldersComponent,  canActivate: [authGuard] },
  { path: 'folders/:id',       component: NotesListComponent, canActivate: [authGuard] },
  { path: 'note/new/:folderId',component: NoteEditorComponent, canActivate: [authGuard] },
  { path: 'note/edit/:id',     component: NoteEditorComponent, canActivate: [authGuard] },

  // всё остальное → тоже на login
  { path: '**', redirectTo: '/login' }
];
