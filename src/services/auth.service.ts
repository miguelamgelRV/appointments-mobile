import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:8003/api'; 
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false); 
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable(); 

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage 
  ) {
    this.initStorage();
  }

  
  private async initStorage() {
    await this.storage.create();
    this.checkAuthentication(); 
  }

  
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          this.saveToken(response.token); 
          this.isAuthenticatedSubject.next(true); 
        }
      })
    );
  }

  
  logout() {
    this.storage.remove('authToken').then(() => {
      this.isAuthenticatedSubject.next(false); 
      this.router.navigate(['/login']); 
    });
  }

  
  private async saveToken(token: string) {
    await this.storage.set('authToken', token);
  }

  
  async getToken(): Promise<string | null> {
    return await this.storage.get('authToken');
  }

  
  private async checkAuthentication() {
    const token = await this.getToken();
    if (token) {
      this.isAuthenticatedSubject.next(true); 
    } else {
      this.isAuthenticatedSubject.next(false);
    }
  }

  
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  
  register(userData: { name: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }
}