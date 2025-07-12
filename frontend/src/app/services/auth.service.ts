import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl = 'http://localhost:8080'; 
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkAuthStatus());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/`, { email, password })
      .pipe(
        map(response => {
          if (response.success) {
            // Agregar email a la respuesta para usar en el componente
            return {
              ...response,
              email: email,
              redirectRoute: this.getRedirectRoute(email)
            };
          }
          return response;
        }),
        tap(response => {
          if (response.success) {
            this.isAuthenticatedSubject.next(true);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    this.isAuthenticatedSubject.next(false);
  }

  checkAuthStatus(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  getToken(): string {
    return localStorage.getItem('authToken') || '';
  }

  getUserData(): any {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  isLoggedIn(): boolean {
    return this.checkAuthStatus();
  }

  private getRedirectRoute(email: string): string {
    if (email.endsWith('@ferremasventas.cl')) {
      return '/view-vendor/main-vendor/productos';
    } else if (email.endsWith('@ferremasbodega.cl')) {
      return '/view-bodega/main-bodega/bod-pedidos';
    }
    return '/'; // Ruta por defecto para clientes
  }

  getUserRedirectRoute(): string {
    const user = JSON.parse(localStorage.getItem('userData') || '{}');
    if (user.email) {
      return this.getRedirectRoute(user.email);
    }
    return '/';
  }
}