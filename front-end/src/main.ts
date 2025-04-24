// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter }     from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent }    from './app/app.component';
import { routes }          from './app.routes';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    // HttpClient
    provideHttpClient(withInterceptorsFromDi()),
    //  JWT
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
});

