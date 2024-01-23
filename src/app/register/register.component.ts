import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../service/toast.service';
import { User } from '../model/User.model';
import { UserService } from './../service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from './confirm/confirm.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;

  registerForm: any = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    account: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])/)]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    confirmPassword: ['', Validators.required],
  }, {
    validator: this.passwordMatchValidator
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    private userService: UserService,
    private dialog: MatDialog  // Add MatDialog dependency
  ) {}

  ngOnInit(): void {
  }
  
  sendVerificationEmail() {
    this.userService.sendEmail(this.registerForm.value.email).subscribe(
      (res) => {
        // Handle successful response if needed
      },
      (err) => {
        switch (err?.error?.text) {
          case 'sended': {
            const dialogRef = this.dialog.open(ConfirmComponent, {
              width: '480px',
              data: { email: this.registerForm.value.email }
            });

            dialogRef.afterClosed().subscribe(result => {
              if (result) {
                // User entered verification code, proceed with verification
                this.checkVerificationCode(result);
              } else {
                // User did not enter verification code, handle as needed
              }
            });
            break;
          }
          // Handle other cases if needed
        }
      }
    );
  }

  checkVerificationCode(verificationCode: string) {
    this.userService.checkcode(verificationCode).subscribe(
      (res: any) => {
        if (res.status === 'verified') {
          this.toastService.show('Mã xác minh hợp lệ');
          this.register();
        } else {
          this.toastService.show('Mã xác minh không hợp lệ !!!');
        }
      },
      (err) => {
        console.error('Lỗi từ API xác minh:', err);
        // Xử lý lỗi khi gọi API
      }
    );
  }
  
  

  register() {
    const user: User = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      account: this.registerForm.value.account,
      password: this.registerForm.value.password,
      phone:this.registerForm.value.phone
    }

    this.userService.register(user).subscribe(res => {
    }, (err) => {
      switch(err?.error?.text) {
        case 'insertfail': {
          this.toastService.show('Email hoặc số điện thoại đã tồn tại', 'err');
          break;
        }
        case 'inserted': {
          this.toastService.show('Đăng ký thành công!');
          this.router.navigate(['/login']);
          break;
        }
      }
    })
    console.log("🤜 ~ user:", user)
  }

  passwordMatchValidator(formGroup: any) {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword').setErrors({ matchPassword: true });
    } else {
      formGroup.get('confirmPassword').setErrors(null);
    }
  }

  return() {
    this.router.navigate(['/login']);
  }
}
