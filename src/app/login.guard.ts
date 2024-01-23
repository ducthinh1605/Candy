import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './service/auth.service';



@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    constructor
    (private authService: AuthService, 
    private router: Router)
     {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']); // Chuyển hướng đến trang chính nếu đã đăng nhập
      return false; // Không cho phép truy cập vào trang đăng nhập
    }
    return true; // Cho phép truy cập vào trang đăng nhập nếu chưa đăng nhập
  }
}