
import { Component, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from 'src/app/service/toast.service';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { DatePipe } from '@angular/common';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { ManageOrderDetailComponent } from './manage-order-detail/manage-order-detail.component';
@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent {
  orders: any= [];
  currentPage: number = 1;
  selectedStatus: any | null = null; // Dùng union type để chỉ định số hoặc null

  // Các hàm và phương thức khác vẫn giữ nguyên như trong đoạn mã trước đó
  

  constructor(
    private toastService :ToastService,
    public dialog: MatDialog,
    private orderService :OrderService,
    private datePipe: DatePipe
  ){}
  formatDate(date: string | Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm:ss') || '';
  }
  ngOnInit(): void{
    this.getOrder();
    
  }
  getOrder() {
    this.orderService.getOrderList().subscribe((res: any) => {
      this.orders = res;
      console.log("🤜 ~ orders:", this.orders)
    })
  }
  getOrderByStatus(status: number) {
    console.log("🤜 ~ status:", status)
    if (status !== null) {
      this.orderService.getOderByStatus(status).subscribe((res: any) => {
        this.orders = res;
        console.log("🤜 ~ res:", res)
      });
    } else {
      this.getOrder(); // Gọi lại hàm để lấy tất cả đơn hàng khi không có trạng thái được chọn
    }
  }
  
  onStatusFilterChange(status: number) {
    this.selectedStatus = status;
    if (status !== null) {
      this.getOrderByStatus(status);
    } if (status==5){
      this.getOrder();
      
    }
  }
  formatTitle(title: string) {
    if(title?.length <= 50) {
      return title;
    }
    return title?.slice(0, 50) + ' ...';
  }

  detail(item: any) {
    const dialogRef = this.dialog.open(ManageOrderDetailComponent, {
      width: '700px',
      data: {
        orders: item,
      }
    });
    console.log("🤜 ~ item:", item)
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
      case 4:
        return 'Đơn hàng hoàng thành';
      default:
        return 'Trạng thái không xác định';
    }
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
        this.orderService.deleteOrder(item.id).subscribe(res => {
        }, (err) => {
          this.getOrder();
          switch(err?.error?.text) {
            case 'deleted': {
              this.toastService.show('Delete successfully', 'err');
              break;
            }
            default: {
              this.toastService.show('Something wrong', 'err');
              break;
            }
          }
          }
        )
      }
    });
  }
}
