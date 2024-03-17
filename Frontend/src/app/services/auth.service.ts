import { Injectable } from '@angular/core';
import { AuthenticationUser } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  authUser(user: AuthenticationUser): Observable<any> {
    return this.http.post('http://localhost:3000/account/auth', user);
  }

  getToken(): string | null {
    return this.token;
  }
}
