// src/app/services/auth.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

interface LoginResp { token: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = '/api/auth/';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  login(username: string, password: string): Observable<LoginResp> {
    return this.http.post<LoginResp>(this.api + 'login/', { username, password });
  }

  logout(): void {
    if (this.isBrowser) localStorage.removeItem('token');
  }

  setToken(token: string): void {
    if (this.isBrowser) localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem('token') : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
