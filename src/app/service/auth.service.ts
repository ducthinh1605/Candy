// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private userDataSubject = new BehaviorSubject<any>(null);
//   userData$ = this.userDataSubject.asObservable();

//   setUserData(userData: any) {
//     this.userDataSubject.next(userData);
//   }
// }
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;
  private AdminloggedIn = false;
  private userDataSubject = new BehaviorSubject<any>(null);
  userData$ = this.userDataSubject.asObservable();

  private adminDataSubject = new BehaviorSubject<any>(null);
  adminData$ = this.adminDataSubject.asObservable();

  private orderIdSubject = new BehaviorSubject<any>(null);
  orderId$ = this.orderIdSubject.asObservable();

  constructor(private cookieService: CookieService) {
    this.loggedIn = this.cookieService.get('loggedIn') === 'true';
    this.AdminloggedIn = this.cookieService.get('AdminloggedIn') === 'true';
    const userData = this.cookieService.get('userData');
    const adminData= this.cookieService.get('adminData');
    if (userData) {
      this.userDataSubject.next(JSON.parse(userData));
    }
    if (adminData) {
      this.adminDataSubject.next(JSON.parse(adminData));
    }
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  isAdminLoggedIn(): boolean {
    return this.loggedIn;
  }

  setUserData(userData: any) {
    // Lưu thông tin đăng nhập vào cookie
    this.cookieService.set('loggedIn', 'true'); // Đánh dấu đã đăng nhập
    this.cookieService.set('userData', JSON.stringify(userData)); // Lưu thông tin user (chuyển thành chuỗi JSON)
    this.userDataSubject.next(userData); // Cập nhật BehaviorSubject để thông báo rằng đã có dữ liệu người dùng mới
    this.loggedIn = true;
  }
  setAdminData(adminData: any) {
    // Lưu thông tin đăng nhập vào cookie
    this.cookieService.set('AdminloggedIn', 'true'); // Đánh dấu đã đăng nhập
    this.cookieService.set('adminData', JSON.stringify(adminData)); 
    this.adminDataSubject.next(adminData); // Cập nhật BehaviorSubject để thông báo rằng đã có dữ liệu người dùng mới
    this.loggedIn = true;
  }
  
  
  getUserData(): any {
    return this.userDataSubject.value; // Trả về giá trị hiện tại của BehaviorSubject
  }
  getUserDataFromCookie(): any {
    const userData = this.cookieService.get('userData');
    return userData ? JSON.parse(userData) : null;
  }

  getadminData(): any {
    return this.adminDataSubject.value; // Trả về giá trị hiện tại của BehaviorSubject
  }
  getAdminDataFromCookie(): any {
    const adminData = this.cookieService.get('adminData');
    return adminData ? JSON.parse(adminData) : null;
  }

  logout(): void {
    // Xóa thông tin đăng nhập khi người dùng logout
    this.cookieService.delete('loggedIn');
    this.cookieService.delete('userData');
    this.userDataSubject.next(null); // Cập nhật BehaviorSubject để thông báo rằng không có dữ liệu người dùng
    this.loggedIn = false;
  }
  adminlogout(): void {
    // Xóa thông tin đăng nhập khi người dùng logout
    this.cookieService.delete('AdminloggedIn');
    this.cookieService.delete('adminData');
    this.userDataSubject.next(null); // Cập nhật BehaviorSubject để thông báo rằng không có dữ liệu người dùng
    this.AdminloggedIn = false;
  }
  
}
