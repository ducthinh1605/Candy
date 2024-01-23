import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoadingService } from 'src/app/service/loading.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.scss']
})
export class OrderhistoryComponent {
  userOrdersHistory: any;

  constructor(
    private loadingService: LoadingService,
    private orderService: OrderService,
    public dialogRef: MatDialogRef<OrderhistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userData: any },
  ) {}
  
  ngOnInit(): void {   
    this.getOrderHistory(this.data.userData);
  }

  getOrderHistory(userId: any){
    console.log("🤜 ~ userId:", userId)
    this.orderService.getorderHistory(userId).subscribe((res: any) => {
      this.userOrdersHistory = res;
      console.log("🤜 ~ res:", res)
      // this.loadingService.hideLoading();
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
