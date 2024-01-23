import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isAdminLoggedIn()) {
      this.router.navigate(['/adminlogin']); // Chuyển hướng đến trang đăng nhập admin nếu chưa đăng nhập
      return false; // Không cho phép truy cập vào trang admin nếu chưa đăng nhập
    }
    return true; // Cho phép truy cập vào trang admin nếu đã đăng nhập
  }
}


//   constructor(
//     private router: Router,
//     private cookieService: CookieService
//   ) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): boolean {
//     const token = this.cookieService.get('token');

//     let role, currentUser: any;
//     if(!token) {
//       this.router.navigate(['/login']);
//       return false;
//     }

//     currentUser = jwt_decode(token);
//     role = currentUser?.role;

//     if(!currentUser || role !== 'admin') {
//       this.router.navigate(['/home']);
//       return false;
//     }

//     return true;
//   }
