import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

import { FlashMessageService } from '../services/flash-message.service';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private flashMessageService: FlashMessageService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  logout() {
    this.authService.logoutUser();
    this.flashMessageService.show('User logout');
    console.log('User logout successfully');
    this.router.navigate(['/account/auth']);
  }

  // геттер для отслеживания состояние токена авторизации
  get authState(): boolean {
    return localStorage.getItem('authToken') !== null;
  }
}
