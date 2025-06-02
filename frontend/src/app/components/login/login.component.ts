import {
  Component
} from '@angular/core';
import {
  Router
} from '@angular/router';

import {
  AuthService
} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = '';
  password = '';
  errorMsg = '';
  

  constructor(private router: Router,
    private authService: AuthService
  ) {}



  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        if (res.success) {
          this.router.navigate(['/productos']);

          alert('Login correcto');
        }
      },
      error: () => {
          alert('Login  incorrecto');

      }
    });
  }


}
