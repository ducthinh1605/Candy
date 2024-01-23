  import { Component } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';
  import { MatDialog } from '@angular/material/dialog';
  import { UserService } from 'src/app/service/user.service';
  import { AuthService } from 'src/app/service/auth.service';
  import { OrderdetailsService } from 'src/app/service/orderdetails.service';
  import { OrderService } from 'src/app/service/order.service';
  import { ToastService } from 'src/app/service/toast.service';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  @Component({
    selector: 'app-useredit',
    templateUrl: './useredit.component.html',
    styleUrls: ['./useredit.component.scss']
  })
  export class UsereditComponent {
    userData: any;
    emailSentSuccess: boolean = false;
    userOrders: any;
    editForm:any;

    constructor(
      private route: ActivatedRoute,
      private userService: UserService,
      private authService: AuthService,
      private orderdetailsService: OrderdetailsService,
      private orderService: OrderService,
      public dialog: MatDialog,
      private toastService: ToastService,
      private formBuilder: FormBuilder
    ) {}
    ngOnInit(): void {
      this.authService.userData$.subscribe((userData) => {
        if (userData) {
          this.getUserInfo(userData?.account, userData?.password);
        }
      });
      
    
      this.buildForm();
    }

    buildForm() {
      this.editForm = this.formBuilder.group({
        name: [this.userData?.name, [Validators.required]],
        email: [this.userData?.email, [Validators.required]],
        account: [this.userData?.account, [Validators.required]],
        phone: [this.userData?.phone, [Validators.required]],
        password: ['', Validators.required],
        checkcode: ['', Validators.required],
      });
    }
    onEdit() {
      const newUser = {
        "id": this.userData?.id,
        'name': this.editForm.value.name,
        'email': this.editForm.value.email,
        'account': this.editForm.value.account,
        'phone': this.editForm.value.phone,
        'password': this.editForm.value.password,
        
      }
      

      this.userService.editUser(newUser).subscribe(res => {
      }, (err) => {
        switch(err?.error?.text) {
          case "updated": {
            this.toastService.show(`Update successfully!`);
            // this.clearForm();
            break;
          }
        }
      })
    }


    getUserInfo(account: string, password: string) {
      this.userService.getuserinfo({ account, password }).subscribe((data) => {
        this.userData = data;
        this.buildForm(); // Gọi hàm buildForm sau khi có dữ liệu người dùng
      })
    }

    sendVerificationEmail(email: string) {
      if (email) {
        this.userService.sendEmail(email).subscribe(
          (res) => {
            // Handle successful response
            this.toastService.show('Send successfully', 'success');
          },
          (err) => {
            if (err?.error?.text === 'sended') {
              // Handle specific error case
              this.toastService.show('Already sent', 'error');
            } else {
              // Handle other errors
              this.toastService.show('Something went wrong', 'error');
            }
          }
        );
      }
    }


    sendEmail() {
      this.sendVerificationEmail(this.userData?.email);
      console.log("🤜 ~ userData?.email:", this.userData?.email)
      this.toastService.show('đã gửi mã xác nhận vui lòng kiểm tra email')
    }
    clearForm() {
      this.editForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required]],
        account: ['', [Validators.required]],
        password: ['', [Validators.required]],
        phone: ['', [Validators.required]],
      });
    }
    checkVerificationCode() {
      const key = this.editForm.value.checkcode; // Lấy khóa nhập từ biểu mẫu
      console.log('Mã xác minh:', key); // Log để kiểm tra khóa đã lấy đúng chưa
    
      this.userService.checkcode(key).subscribe(
        (res: any) => {
          if (res.status === 'verified') {
           this.toastService.show('mã xác minh hợp lệ')
           this.onEdit()
          } else {
            this.toastService.show('mã xác minh không hợp lệ !!!')
          }
        },
        (err) => {
          console.error('Lỗi từ API xác minh:', err);
          // Xử lý lỗi khi gọi API
        }
      );
    }    
  }
