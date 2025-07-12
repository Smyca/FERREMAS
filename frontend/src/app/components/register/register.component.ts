import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMsg = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onRegister() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!this.username || !this.email || !this.password) {
      alert('Por favor completa todos los campos');
      return;
    }

    // Aquí implementarás la lógica de registro con tu servicio
    // Por ahora solo simulamos el registro exitoso
    alert('Registro exitoso');
    this.router.navigate(['/login']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}