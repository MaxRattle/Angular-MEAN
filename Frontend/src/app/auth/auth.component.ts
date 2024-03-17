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

import { HttpClientModule } from '@angular/common/http';
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
    private router: Router
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
      this.authService.authUser(user).subscribe(
        () => {
          this.flashMessageService.show('Auth success.');
          console.log('Authentication Successfully');
          this.router.navigate(['/account/dashboard']);
        },
        (error: any) => {
          // Ошибка аутентификации
          this.flashMessageService.show('Authentication failed.');
          console.log('Authentication failed');
          console.error('Authentication failed', error);
        }
      );
    }
  }
}
