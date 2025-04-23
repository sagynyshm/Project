import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';     // сюда вводится e-mail или username
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}
  goRegister() {
    this.router.navigate(['/register']);
  }
  

  /** вызывается при клике на кнопку Log in */
  onLogin() {
    const ok = this.auth.login(this.username.trim(), this.password);

    if (ok) {
      this.router.navigate(['/']);     // переход в приложение
    } else {
      alert('Invalid credentials');    // или вывод ошибки
    }
  }
}

