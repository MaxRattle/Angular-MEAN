import { Injectable } from '@angular/core';
import { AuthenticationUser } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  authUser(user: AuthenticationUser): Observable<any> {
    return this.http.post('http://localhost:3000/account/auth', user).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.token = response.token;
        }
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);

    return throwError(() => new Error(errorMessage));
  }

  getAuthToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    // Проверяем, есть ли токен аутентификации
    const token = this.getAuthToken();
    console.log(!!token);

    return !!token; // Преобразуем token в булево значение
  }
}
