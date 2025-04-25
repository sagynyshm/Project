import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, tap } from 'rxjs';

export interface LoginResp {
  access: string;
  refresh: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = '/api/';
  private readonly TOKEN_KEY = 'TASK_MANAGER_TOKEN';
  private readonly REFRESH_KEY = 'TASK_MANAGER_REFRESH';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  login(username: string, password: string): Observable<LoginResp> {
    return this.http.post<LoginResp>(this.api + 'login/', { username, password }).pipe(
      tap(res => {
        if (this.isBrowser) {
          localStorage.setItem(this.TOKEN_KEY, res.access);
          localStorage.setItem(this.REFRESH_KEY, res.refresh);
        }
      })
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.api}register/`, { username, email, password });
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_KEY);
    }
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem(this.TOKEN_KEY) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}




// // src/app/services/auth.service.ts
// import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { isPlatformBrowser } from '@angular/common';
// import { Observable } from 'rxjs';

// interface LoginResp { token: string; }

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private api = '/api/auth/';
//   private isBrowser: boolean;

//   constructor(
//     private http: HttpClient,
//     @Inject(PLATFORM_ID) platformId: Object
//   ) {
//     this.isBrowser = isPlatformBrowser(platformId);
//   }

//   login(username: string, password: string): Observable<LoginResp> {
//     return this.http.post<LoginResp>(this.API_URL + 'login/', { username, password }).pipe(
//       tap(res => {
//         localStorage.setItem(this.TOKEN_KEY, res.access);
//         localStorage.setItem(this.REFRESH_KEY, res.refresh);
//       })
//     );
//   }

//   // login(username: string, password: string): Observable<LoginResp> {
//   //   return this.http.post<LoginResp>(this.api + 'login/', { username, password });
//   // }

//   logout(): void {
//     if (this.isBrowser) localStorage.removeItem('token');
//   }

//   setToken(token: string): void {
//     if (this.isBrowser) localStorage.setItem('token', token);
//   }

//   getToken(): string | null {
//     return this.isBrowser ? localStorage.getItem('token') : null;
//   }

//   isAuthenticated(): boolean {
//     return !!this.getToken();
//   }

//   register(username: string, email: string, password: string): Observable<any> {
//     return this.http.post(`${this.api}/register/`, { username, email, password });
//   }
  
// }
