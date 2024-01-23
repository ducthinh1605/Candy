import { Component } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { forkJoin } from 'rxjs';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.scss']
})
export class StatisticalComponent {
  startDate: any;
  endDate: any;
  revenue: any=0; // Initialize revenue with a default value
  productSold: any=0;
  orderSold: any=0;
  topUsers: any=[];

  constructor(
    private orderService: OrderService,
    private toastService: ToastService
    
    ) {}

  getRevenue() {
    if (this.startDate && this.endDate && this.startDate <= this.endDate) {
      this.orderService.getRevenue(this.startDate, this.endDate)
        .subscribe(
          (response) => {
            // Assuming the response is a number representing revenue
            this.revenue = response;
            console.log("🤜 ~ response:", response);
          },
          (error) => {
            
          }
        );
    } else {
      this.toastService.show('ngày bắt đầu không được lớn hơn ngày kết thúc')
    }
  }

  getData() {
    if (this.startDate && this.endDate && this.startDate <= this.endDate) {
      forkJoin([
        this.orderService.getProductSold(this.startDate, this.endDate),
        this.orderService.getOderSold(this.startDate, this.endDate)
      ]).subscribe(
        ([productSoldResponse, orderSoldResponse]) => {
          // Assuming the responses are numbers representing productSold and orderSold
          this.productSold = productSoldResponse;
          this.orderSold = orderSoldResponse;
          console.log("🤜 ~ productSoldResponse:", productSoldResponse);
          console.log("🤜 ~ orderSoldResponse:", orderSoldResponse);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.toastService.show('ngày bắt đầu không được lớn hơn ngày kết thúc')
    }
    }
    getTopUser() {
      if (this.startDate && this.endDate && this.startDate <= this.endDate) {
        this.orderService.getTopUser(this.startDate, this.endDate)
          .subscribe(
            (response) => {
              // Assuming the response is a number representing revenue
              this.topUsers = response;
              console.log("🤜 ~ response:", response);
            },
            (error) => {
              
            }
          );
      } else {
        this.toastService.show('ngày bắt đầu không được lớn hơn ngày kết thúc')
      }
    }
    getCurrentDate(): string {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const day = currentDate.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
  }
  
  }
