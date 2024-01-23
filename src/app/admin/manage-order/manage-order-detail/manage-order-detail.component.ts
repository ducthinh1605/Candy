
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
// import { get } from 'jquery';
import { ImageViewComponent } from 'src/app/image-view/image-view.component';
import { CartService } from 'src/app/service/cart.service';
import { LoadingService } from 'src/app/service/loading.service';
import { OrderService } from 'src/app/service/order.service';
import { OrderdetailsService } from 'src/app/service/orderdetails.service';
import { ToastService } from 'src/app/service/toast.service';


@Component({
  selector: 'app-manage-order-detail',
  templateUrl: './manage-order-detail.component.html',
  styleUrls: ['./manage-order-detail.component.scss']
})
export class ManageOrderDetailComponent {
  currentPage: number = 1;
  order: any;
  editStatus: any;
  dialog: any;
  orders: any;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private cartService: CartService,
    private orderdetailsService: OrderdetailsService,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<ManageOrderDetailComponent>,
    private orderService: OrderService,
    @Inject(MAT_DIALOG_DATA) public data: { orders: any },
  ) {}

  ngOnInit(): void {
    this.order = this.data.orders;
    console.log("🤜 ~ this.order:", this.order.id)
    this.getOrderdetails(this.order.id);
  }

  getOrderdetails(id: any){
    console.log("🤜 ~ id:", id)
    this.orderdetailsService.getOderDetails(id).subscribe((res: any) => {
      this.orders = res;
      console.log("🤜 ~ res:", res)
      // this.loadingService.hideLoading();
    })
  }

onNoClick(): void {
  this.dialogRef.close();
}

edit(idStatus: any, status: number) {

  const newStatus = {
    orderId: idStatus.id,
    status: status,
    userId: idStatus.usersId.id,
  }
  console.log("🚀 ~ ManageOrderShowComponent ~ newProduct:", newStatus)


  this.orderService.setStatus(newStatus).subscribe(res => {
  }, (err) => {
    switch(err?.error?.text) {
      case "updated": {
        this.toastService.show('Update successfully!');
        break;
      }
    }
  })
}
}
