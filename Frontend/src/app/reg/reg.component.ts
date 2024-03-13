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

import { FlashMessageService } from '../servises/flash-message.service';

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
  ],
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.scss',
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

  constructor(private flashMessageService: FlashMessageService) {}

  signUp() {
    const user = {
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
      return;
    }
  }
}
