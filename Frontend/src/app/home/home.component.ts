import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

import { MatChipsModule } from '@angular/material/chips';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { DashService } from '../services/dash.service';

import { QuillModule } from 'ngx-quill';

import { Post } from '../interfaces/post';

import { DatePipe } from '@angular/common';

import { RouterLink } from '@angular/router';

import { SortPostPipe } from '../pipes/sort-post.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    MatChipsModule,
    MatButtonModule,
    MatCardModule,
    QuillModule,
    DatePipe,
    RouterLink,
    SortPostPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];

  constructor(private dashService: DashService) {}

  ngOnInit(): void {
    this.dashService.getAllPosts().subscribe(
      (posts) => (this.posts = posts),
      (err) => {},
      () => {
        for (let i = 0; i < this.posts.length; i++) {
          this.posts[i].text = this.posts[i].text.substring(0, 250);
        }
      }
    );
  }

  category!: string;

  setCategory(category: string) {
    this.category = category;
    console.log(category);
  }
}
