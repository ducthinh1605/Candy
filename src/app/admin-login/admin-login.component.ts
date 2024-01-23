
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './../service/login.service';
import { User } from './../model/User.model';
import { ToastService } from '../service/toast.service';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { AuthService } from '../service/auth.service';
import { Admin } from '../model/Admin.model';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit  {
  account: string = '';
  password: string = '';
  

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
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    // Có thể thực hiện một số logic khởi tạo ở đây
  }

  check_Login() {
    const admin: Admin = {
      account: this.loginForm.value.account,
      password: this.loginForm.value.password
    }

    this.loginService.loginAdmin(admin).subscribe(res => {
    }, async (err) => {
      switch(err?.error?.text) {
        case 'no': {
          this.toastService.show('User name or password incorrect', 'err');
          break;
        }
        default: {
          this.router.navigate(['/admin']);
          this.authService.setAdminData(admin); // Lưu thông tin đăng nhập vào cookie khi đăng nhập thành công
          console.log("🤜 ~ admin:", admin)
          break;
        }
      }
    })
  }
}
