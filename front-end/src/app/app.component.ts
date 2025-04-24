import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService }  from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    public auth: AuthService,
    public router: Router
  ) {}
  shouldShowFooter(): boolean {
    const url = this.router.url;
    return this.auth.isAuthenticated()
        && url !== '/login'
        && url !== '/register';
  }
}
