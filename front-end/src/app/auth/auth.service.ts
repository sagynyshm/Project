import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface LocalUser {
  email:    string;
  username: string;
  password: string;   // (!) хранится в plain-text только для демо!
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'TASK_TOKEN';
  private readonly USERS_KEY = 'TASK_USERS';   // массив зарегистрированных

  constructor(private router: Router) {}

  /* ---------- REGISTER ---------- */
  register(email: string, username: string, password: string): boolean {
    const users: LocalUser[] = JSON.parse(localStorage.getItem(this.USERS_KEY) ?? '[]');

    if (users.find(u => u.email === email)) {
      return false;                                // e-mail уже занят
    }
    users.push({ email, username, password });
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return true;
  }

  /* ---------- LOGIN ---------- */
  login(emailOrUsername: string, password: string): boolean {
    const users: LocalUser[] = JSON.parse(localStorage.getItem(this.USERS_KEY) ?? '[]');
    const user = users.find(u =>
      (u.email === emailOrUsername || u.username === emailOrUsername) &&
       u.password === password
    );

    if (user) {
      localStorage.setItem(this.TOKEN_KEY, 'dummy-token');  // «фальшивый» JWT
      return true;
    }
    return false;
  }

  /* ---------- STATE / LOGOUT ---------- */
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

 
}
