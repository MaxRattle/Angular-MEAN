import { Component, OnInit } from '@angular/core';

import { HeaderComponent } from '../header/header.component';

import { DashService } from '../services/dash.service';

import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';

import { AsyncPipe } from '@angular/common';

import { Post } from '../interfaces/post';

import { DatePipe } from '@angular/common';

import { QuillModule } from 'ngx-quill';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import { Router } from '@angular/router';
import { FlashMessageService } from '../services/flash-message.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    HeaderComponent,
    AsyncPipe,
    DatePipe,
    QuillModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  // важно
  post$!: Observable<Post>;
  name!: string;

  constructor(
    private dashService: DashService,
    private route: ActivatedRoute,
    private flashMessageService: FlashMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('authToken') != null) {
      const authUser = localStorage.getItem('authUser');
      authUser
        ? (this.name = JSON.parse(authUser).name)
        : console.log('Delete decline!');
    }
    this.post$ = this.route.params.pipe(
      switchMap((params: Params) => this.dashService.getPostById(params['id'])),
      tap((post) => console.log(post)) // для отладки
    );
  }

  removePost(_id: any) {
    this.dashService.removePostById(_id).subscribe({
      next: () => {
        this.flashMessageService.show('Remove post sucess.');
        this.router.navigate(['/']);
      },
      error: () => {
        this.flashMessageService.show('Remove post was with error.');
      },
    });
  }
}
