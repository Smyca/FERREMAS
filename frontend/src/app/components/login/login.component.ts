import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMsg = '';
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email, password).subscribe({
        next: (response) => {
          if (response.success) {
            // Guardar datos en localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userData', JSON.stringify({ email }));
            
            // Obtener la ruta de redirección correcta
            const redirectRoute = this.authService.getUserRedirectRoute();
            
            // Navegar a la ruta correspondiente
            this.router.navigate([redirectRoute]);
          }
        },
        error: (error) => {
          console.error('Error en login:', error);
          this.errorMsg = 'Error de autenticación';
        }
      });
    }
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }
}
