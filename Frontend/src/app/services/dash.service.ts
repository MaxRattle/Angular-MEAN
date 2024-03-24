import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../interfaces/post';

import { FlashMessageService } from './flash-message.service';
import { Router } from '@angular/router';

import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashService {
  constructor(
    private http: HttpClient,
    private flashMessageService: FlashMessageService,
    private router: Router
  ) {}

  dashUser(post: Post) {
    this.http.post('http://localhost:3000/account/dashboard', post).subscribe({
      next: () => {
        this.flashMessageService.show('Submit sucess.');
        this.router.navigate(['/']);
      },
    });
  }

  getAllPosts(): Observable<any> {
    return this.http.get('http://localhost:3000/').pipe(
      map((res: any) => res) // Просто возвращаем ответ как есть
    );
  }

  getPostById(_id: any): Observable<Post> {
    return this.http.get<Post>(`http://localhost:3000/post/${_id}`);
  }

  removePostById(_id: any): Observable<Post> {
    return this.http.delete<Post>(`http://localhost:3000/post/${_id}`);
  }
}
