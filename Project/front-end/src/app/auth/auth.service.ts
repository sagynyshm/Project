// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private readonly TOKEN_KEY = 'TASK_MANAGER_TOKEN';

//   constructor(private router: Router) {}

//   login(username: string, password: string): boolean {
//     // TODO: заменить на запрос к Django
//     if (username && password) {
//       localStorage.setItem(this.TOKEN_KEY, 'fake-jwt-token');
//       return true;
//     }
//     return false;
//   }

//   logout() {
//     localStorage.removeItem(this.TOKEN_KEY);
//     this.router.navigate(['/login']);
//   }

//   isAuthenticated(): boolean {
//     return !!localStorage.getItem(this.TOKEN_KEY);
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

interface LocalUser {
  email:    string;
  username: string;
  password: string;   // (!) хранится в plain-text только для демо!
}

@Injectable({ providedIn: 'root' })
export class AuthService {
<<<<<<< Updated upstream
  private readonly TOKEN_KEY = 'TASK_TOKEN';
  private readonly USERS_KEY = 'TASK_USERS';   // массив зарегистрированных
=======
  private readonly TOKEN_KEY = 'TASK_MANAGER_TOKEN';
  private readonly REFRESH_KEY = 'TASK_MANAGER_REFRESH';
  private readonly API_URL = 'http://localhost:8000/api';  // измени под свой адрес
>>>>>>> Stashed changes

  constructor(private http: HttpClient, private router: Router) {}

<<<<<<< Updated upstream
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
=======
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/login/`, { username, password }).pipe(
      tap((res: any) => {
        localStorage.setItem(this.TOKEN_KEY, res.access);
        localStorage.setItem(this.REFRESH_KEY, res.refresh);
      })
    );
>>>>>>> Stashed changes
  }

  /* ---------- STATE / LOGOUT ---------- */
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
<<<<<<< Updated upstream
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

 
=======

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
>>>>>>> Stashed changes
}


