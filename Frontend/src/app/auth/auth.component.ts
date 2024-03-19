import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatButtonModule } from '@angular/material/button';

import { FlashMessageService } from '../services/flash-message.service';

import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { AuthenticationUser } from '../interfaces/user';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [AuthService],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);

  email!: string;
  password!: string;

  constructor(
    private flashMessageService: FlashMessageService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  signIn() {
    const user: AuthenticationUser = {
      email: this.email,
      password: this.password,
    };

    if (this.emailFormControl.invalid || this.passwordFormControl.invalid) {
      this.flashMessageService.show('Please fill in all required fields.');
      return;
    } else if (
      !this.emailFormControl.invalid ||
      !this.passwordFormControl.invalid
    ) {
      // Успешная аутентификация
      this.authService.authUser(user).subscribe({
        next: () => {
          this.flashMessageService.show('Auth success.');
          console.log('Authentication Successfully');

          // Получение токена после успешной аутентификации
          const token = this.authService.getAuthToken();
          if (!token) {
            // Обработка случая, когда токен отсутствует
            console.log('Token not found');
            return;
          }

          // Сохранение токена в локальном хранилище браузера
          localStorage.setItem('authToken', token);
          // Сохранение объекта пользователя в локальном хранилище браузера
          localStorage.setItem('authUser', JSON.stringify(user));

          // Отправка запроса на защищенный маршрут с токеном в заголовке
          const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
          });

          this.http
            .get('http://localhost:3000/account/dashboard', { headers })
            .subscribe({
              next: () => {
                // Обработка успешного доступа
                this.router.navigate(['/account/dashboard']);
              },
              error: (error) => {
                // Обработка ошибки HTTP-запроса
                console.error('Error accessing protected route:', error);
              },
            });
        },
        error: (error: any) => {
          // Ошибка аутентификации
          this.flashMessageService.show('Authentication failed.');
          console.log('Authentication failed');
          console.error('Authentication failed', error);
        },
      });
    }
  }
}
