import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../interfaces/post';

import { FlashMessageService } from './flash-message.service';
import { Router } from '@angular/router';

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
}
