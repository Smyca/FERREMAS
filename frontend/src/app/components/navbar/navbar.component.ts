import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  
  isLoggedIn = false;
  username = '';
  isMenuOpen = false;
  private authSubscription!: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Suscribirse a los cambios de autenticación
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuth) => {
        this.isLoggedIn = isAuth;
        if (isAuth) {
          this.username = this.authService.getUsername();
        } else {
          this.username = '';
        }
      }
    );

    // Verificar estado inicial
    this.checkAuthStatus();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  checkAuthStatus() {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.username = this.authService.getUsername();
    }
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
    this.router.navigate(['/']);
  }

  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  navigateToOrders() {
    this.router.navigate(['/orders']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
