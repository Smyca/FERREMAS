import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  isLoggedIn = false;
  username = '';
  isMenuOpen = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Verificar si el usuario está logueado (esto lo conectarás con tu servicio de autenticación)
    this.checkAuthStatus();
  }

  checkAuthStatus() {
    // Por ahora simulamos que el usuario está logueado
    // Luego esto se conectará con tu servicio de autenticación
    const token = localStorage.getItem('authToken');
    this.isLoggedIn = !!token;
    this.username = localStorage.getItem('username') || 'Usuario';
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToProducts() {
    this.router.navigate(['/products']);
  }

  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
