import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatSelectModule } from '@angular/material/select';

import { FormControl, Validators } from '@angular/forms';

import { FormControlDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { FormGroupDirective } from '@angular/forms';

import { QuillModule } from 'ngx-quill';

import { FlashMessageService } from '../services/flash-message.service';
// ser
import { Router } from '@angular/router';

import { Post } from '../interfaces/post';

// Кастомный обработчик ошибок
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    QuillModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  selected = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);
  matcher = new MyErrorStateMatcher();

  titleFormControl = new FormControl('', [Validators.required]);

  photoFormControl = new FormControl('', [Validators.required]);
  textFormControl = new FormControl('', [Validators.required]);

  // имена обрабатываемых полей
  category!: string;
  title!: string;
  photo!: string;
  text!: string;

  constructor(
    private flashMessageService: FlashMessageService,
    // private regService: RegService,
    private router: Router
  ) {}

  createPost() {
    // Вынес в переменные для лучшей типизации и обработок ошибок
    const authUser = localStorage.getItem('authUser');
    const author = authUser ? JSON.parse(authUser).name : 'Unknown'; // Если authUser равно null, то автор будет 'Unknown'

    const post: Post = {
      category: this.category,
      title: this.title,
      photo: this.photo,
      text: this.text,
      author: author,
      date: new Date(),
    };
    // Оповещения об отправке
    if (
      this.selected.invalid ||
      this.titleFormControl.invalid ||
      this.photoFormControl.invalid ||
      this.textFormControl.invalid
    ) {
      this.flashMessageService.show('Please fill in all required fields.');
      return;
    } else if (
      !this.selected.invalid ||
      !this.titleFormControl.invalid ||
      !this.photoFormControl.invalid ||
      !this.textFormControl.invalid
    ) {
      this.flashMessageService.show('Submit sucess.');
      console.log('Post created');
      // this.regService.regUser(user);
      // this.router.navigate(['/account/auth']);
      return;
    }
  }
}
