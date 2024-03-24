import { Component, OnInit } from '@angular/core';

import { HeaderComponent } from '../header/header.component';

import { DashService } from '../services/dash.service';

import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';

import { AsyncPipe } from '@angular/common';

import { Post } from '../interfaces/post';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [HeaderComponent, AsyncPipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  // не уверен
  post$!: Observable<Post>;

  constructor(
    private dashService: DashService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.post$ = this.route.params.pipe(
      switchMap((params: Params) => this.dashService.getPostById(params['id'])),
      tap((post) => console.log(post)) // для отладки
    );
  }
}
