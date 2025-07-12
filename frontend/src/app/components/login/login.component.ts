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
          // Guardar información del usuario en localStorage
          localStorage.setItem('authToken', res.token || 'dummy-token');
          localStorage.setItem('username', this.username);
          localStorage.setItem('isLoggedIn', 'true');
          
          // Opcional: guardar más datos del usuario si están disponibles
          if (res.user) {
            localStorage.setItem('userData', JSON.stringify(res.user));
          }

          this.router.navigate(['/']);
          
        }
      },
      error: () => {
        alert('Login incorrecto');
      }
    });
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }
}
