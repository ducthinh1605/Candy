import { Component, Inject } from '@angular/core';
import { LoadingService } from 'src/app/service/loading.service';
import { OrderService } from 'src/app/service/order.service';
import { OrderdetailsService } from 'src/app/service/orderdetails.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-useroderdetails',
  templateUrl: './useroderdetails.component.html',
  styleUrls: ['./useroderdetails.component.scss']
})
export class UseroderdetailsComponent {
  currentPage: number = 1;
  userOrders: any;
  dialog: any;
  orderDetails: any;

  constructor(
    private loadingService: LoadingService,
    private orderdetailsService: OrderdetailsService,
    public dialogRef: MatDialogRef<UseroderdetailsComponent>,
    private orderService: OrderService,
    @Inject(MAT_DIALOG_DATA) public data: { userOrders: any },
  ) {}
  ngOnInit(): void {
    this.userOrders = this.data.userOrders;
    console.log("🤜 ~ this.order:", this.userOrders.id)
    this.getOrderdetails(this.userOrders.id);
  }

  getOrderdetails(id: any){
    console.log("🤜 ~ id:", id)
    this.orderdetailsService.getOderDetails(id).subscribe((res: any) => {
      this.orderDetails = res;
      console.log("🤜 ~ res:", res)
      // this.loadingService.hideLoading();
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
