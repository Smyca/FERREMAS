import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl = 'http://localhost:8080'; 
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkAuthStatus());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/`, { username, password })
      .pipe(
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
}