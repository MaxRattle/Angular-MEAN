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

import { RegService } from '../services/reg.service';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationUser } from '../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg',
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
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.scss',
  providers: [RegService],
})
export class RegComponent {
  // Валидаторы
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-ZА-Яа-я]+$'),
  ]);
  loginFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-ZА-Яа-я]+$'),
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(20),
  ]);
  // Отправка
  name!: string;
  login!: string;
  email!: string;
  password!: string;

  constructor(
    private flashMessageService: FlashMessageService,
    private regService: RegService,
    private router: Router
  ) {}

  signUp() {
    const user: RegistrationUser = {
      name: this.name,
      login: this.login,
      email: this.email,
      password: this.password,
    };
    // Оповещения об отправке
    if (
      this.nameFormControl.invalid ||
      this.loginFormControl.invalid ||
      this.emailFormControl.invalid ||
      this.passwordFormControl.invalid
    ) {
      this.flashMessageService.show('Please fill in all required fields.');
      return;
    } else if (
      !this.nameFormControl.invalid ||
      !this.loginFormControl.invalid ||
      !this.emailFormControl.invalid ||
      !this.passwordFormControl.invalid
    ) {
      this.flashMessageService.show('Submit sucess.');
      console.log('signUp called');
      this.regService.regUser(user);
      this.router.navigate(['/account/auth']);
      return;
    }
  }
}
