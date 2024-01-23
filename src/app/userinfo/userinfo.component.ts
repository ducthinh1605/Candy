import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import { ToastService } from '../service/toast.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { OrderdetailsService } from '../service/orderdetails.service';
import { OrderService } from '../service/order.service';
import { UseroderdetailsComponent } from './useroderdetails/useroderdetails.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';
import { LoadingService } from '../service/loading.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss'],
})
export class UserinfoComponent {
  userData: any;
  emailSentSuccess: boolean = false;
  userOrders: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private orderdetailsService: OrderdetailsService,
    private orderService: OrderService,
    public dialog: MatDialog,
    private toastService: ToastService,
    private loadingService: LoadingService,


  ) {}

  ngOnInit(): void {
    this.authService.userData$.subscribe((userData) => {
      if (userData) {
        this.userData = userData;
        this.getUserInfo(this.userData?.account, this.userData?.password);
        this.sendVerificationEmail(this.userData?.email);
      }
    });
  }

  getUserInfo(account: string, password:string){
    this.userService.getuserinfo({account,password}).subscribe((data) =>{
      this.userData = data;
      console.log("🤜 ~ this.currentUser:", this.userData)
      this.getOrderByUser();
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
  }

  getOrderByUser(){
    this.orderService.getgetOderByUser(this.userData?.id).subscribe((res: any) => {
      this.userOrders = res;
      console.log("🤜 ~ this.userOrders:", this.userOrders)
    })
  }
  getStatusName(status: number): string {
    switch (status) {
      case 0:
        return 'Chờ xác nhận';
      case 1:
        return 'Đã xác nhận';
      case 2:
        return 'Đang giao';
      case 3:
        return 'Đã giao thành công';
      default:
        return 'Trạng thái không xác định';
    }
  }
  
  markOrderAsReceived(item: any) {
    // Gọi service để thay đổi trạng thái đơn hàng thành 4 (Đã nhận được hàng)
    this.orderService.setStatus({
      orderId: item.id,
      status: 4, // Trạng thái mới
      userId: this.userData?.id
    }).subscribe(
      (res) => {
      },
      (err) => {
        if (err.error.text === 'updated') {
          this.toastService.show('Xác nhận đã nhận hàng');
          this.getOrderByUser();
        }
      }
    );
  }
  history() {
    const userId = this.userData?.id; // Lấy userId từ userData

    const dialogRef = this.dialog.open(OrderhistoryComponent, {
        width: '600px',
        data: {
            userData: userId, // Truyền userId vào data
        }
    });

    console.log("🤜 ~ userId:", userId);
}


  detail(item: any) {
    const dialogRef = this.dialog.open(UseroderdetailsComponent, {
      width: '600px',
      data: {
        userOrders: item,
      }
    });
    console.log("🤜 ~ item:", item)
    }

    deleteOrder(item: any) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: `Are you sure you want to delete`,
          message: `Confirm delete?`
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.orderService.deleteOrderByUser(item.id).subscribe(res => {
          }, (err) => {
            this.getOrderByUser();
            switch(err?.error?.text) {
              case 'deleted': {
                this.toastService.show('Delete successfully', 'err');
                break;
              }
              default: {
                this.toastService.show('Đơn hàng đang giao hoặc đã xác nhận ! không thể hủy đơn hàng', 'err');
                break;
              }
            }
            }
          )
        }
      });
    }
  
}
