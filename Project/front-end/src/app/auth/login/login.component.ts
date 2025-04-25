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
  username = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  goRegister() {
    this.router.navigate(['/register']);
  }

  onLogin() {
    this.auth.login(this.username.trim(), this.password).subscribe({
      next: () => {
        this.router.navigate(['/folders']);
      },
      error: (err) => {
        alert('Неверные данные для входа');
        console.error('Login error:', err);
      }
    });
  }
}




// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth.service';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './login.component.html'
// })
// export class LoginComponent {
//   username = '';     
//   password = '';

//   constructor(
//     private auth: AuthService,
//     private router: Router
//   ) {}
//   goRegister() {
//     this.router.navigate(['/register']);
//   }
  


// onLogin() {
//   const ok = this.auth.login(this.username.trim(), this.password);

//   if (ok) {
//     this.router.navigate(['/folders']);   
//   } else {
//     alert('Invalid credentials');
//   }
// }

// }

