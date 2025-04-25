// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

interface LoginResp {
  access: string;
  refresh: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly ACCESS_KEY  = 'TASK_ACCESS_TOKEN';
  private readonly REFRESH_KEY = 'TASK_REFRESH_TOKEN';
  private readonly API_URL     = 'http://localhost:8000/api';  // поменяй под свой бек

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /** Отправляет credentials на бэк и сохраняет полученные access и refresh токены */
  login(username: string, password: string): Observable<LoginResp> {
    return this.http
      .post<LoginResp>(`${this.API_URL}/auth/login/`, { username, password })
      .pipe(
        tap(res => {
          localStorage.setItem(this.ACCESS_KEY, res.access);
          localStorage.setItem(this.REFRESH_KEY, res.refresh);
        })
      );
  }

  /** Опционально: регистрация через API */
//   register(username: string, password: string): Observable<any> {
//     return this.http.post(`${this.API_URL}/auth/register/`, { username, password });
//   }

  /** Удаляет токены и редиректит на /login */
  logout(): void {
    localStorage.removeItem(this.ACCESS_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
    this.router.navigate(['/login']);
  }

  /** Проверяет, залогинен ли пользователь */
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.ACCESS_KEY);
  }

  /** Для интерцептора: вернуть access-токен */
  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_KEY);
  }

  /** При необходимости: вернуть refresh-токен */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_KEY);
  }
}
й
