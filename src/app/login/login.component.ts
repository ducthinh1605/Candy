// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { LoginService } from './../service/login.service';
// import { User } from './../model/User.model';
// import { ToastService } from '../service/toast.service';
// import { CookieService } from 'ngx-cookie-service';
// import jwt_decode from 'jwt-decode';
// import { AuthService } from '../service/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit  {
//   account: string = '';
//   password: string = '';
//   remember: any;

//   loginData: any;

//   loginForm: any = this.fb.group({
//     account: ['', [Validators.required]],
//     password: ['', Validators.required],
//   });

//   constructor(
//     private router: Router,
//     private fb: FormBuilder,
//     private loginService: LoginService,
//     private toastService: ToastService,
//     private authService: AuthService,
//   ) {}

//   ngOnInit(): void {
   
//   }

//   register() {
//     this.router.navigate(['/register']);
//   }

//   check_Login() {
//     const user: User = {
//       account: this.loginForm.value.account,
//       password: this.loginForm.value.password
//     }

//     this.loginService.login(user).subscribe(res => {
//     }, async (err) => {
//       switch(err?.error?.text) {
//         case 'no': {
//           this.toastService.show('User name or password incorrect', 'err');
//           break;
//         }
//         default: {
//           this.router.navigate(['/home']);
//           this.authService.setUserData(user);
//           console.log("🤜 ~ user:", user)

//           break;
//         }
//       }
//     })
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './../service/login.service';
import { User } from './../model/User.model';
import { ToastService } from '../service/toast.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {
    account: string = '';
  password: string = '';
  remember: any;

  loginData: any;

  loginForm: any = this.fb.group({
    account: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    private toastService: ToastService,
    private authService: AuthService,
    private cookieService: CookieService, //Thêm vào constructor
  ) {}

  ngOnInit(): void {
    // Có thể thực hiện một số logic khởi tạo ở đây
  }
    register() {
    this.router.navigate(['/register']);
  }

  check_Login() {
    const user: User = {
      account: this.loginForm.value.account,
      password: this.loginForm.value.password
    }

    this.loginService.login(user).subscribe(res => {
    }, async (err) => {
      switch(err?.error?.text) {
        case 'no': {
          this.toastService.show('User name or password incorrect', 'err');
          break;
        }
        default: {
          this.router.navigate(['/home']);
          this.authService.setUserData(user); // Lưu thông tin đăng nhập vào cookie khi đăng nhập thành công
          console.log("🤜 ~ user:", user)
          break;
        }
      }
    })
  }
}

