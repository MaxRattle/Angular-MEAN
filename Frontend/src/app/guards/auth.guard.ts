import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('authToken') != null) {
      // Если пользователь авторизован, разрешаем доступ к маршруту
      console.log('canActivate return TRUE Auth success');
      return true;
    } else {
      // Если пользователь не авторизован, перенаправляем на страницу входа
      console.log('canActivate return FALSE Auth not success');
      this.router.navigate(['/account/auth']);
      return false;
    }
  }
}
