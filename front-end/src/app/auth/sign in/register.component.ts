// src/app/auth/register/register.component.ts
import { Component }   from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService }  from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  email    = '';   // привязка к полю E-mail
  username = '';   // привязка к полю Username
  password = '';   // привязка к полю Password

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onRegister() {
    // trim() убирает лишние пробелы
    const ok = this.auth.register(
      this.email.trim(),
      this.username.trim(),
      this.password
    );

    if (ok) {
      alert('Account created! Please log in.');
      this.router.navigate(['/login']);
    } else {
      alert('E-mail already registered');
    }
  }
}
