import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from '../service/toast.service';
import jwt_decode from 'jwt-decode';
import { CartService } from '../service/cart.service';
import { combineLatest } from 'rxjs';
import { UserService } from '../service/user.service';
import { LoadingService } from '../service/loading.service';
import { AuthService } from '../service/auth.service';
import { OrderService } from '../service/order.service';
import { OrderdetailsService } from '../service/orderdetails.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  totalPrice:number=0;
  cartData:any;
  currentUser:any;
  selectedPaymentMethod=1;
  checkoutForm:any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    // private cookieService: CookieService,
    private cartService: CartService,
    private authService :AuthService,
    private userService: UserService,
    public loadingService: LoadingService,
    public orderService: OrderService,
    public orderDetailsService: OrderdetailsService
 

  ) {}

  ngOnInit() {
    this.loadingcart();
    this.checkoutForm = this.fb.group(
      {
        order_name: ['', Validators.required],
        order_phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        order_city: ['', Validators.required],
        order_district: ['', Validators.required],
        order_wards: ['', Validators.required],
        order_street: ['', Validators.required],
        note: ['',Validators.required],
      }
    )

  }
  loadingcart(){
    // Subscribe để lắng nghe sự thay đổi trong dữ liệu cart
    this.cartService.cartData$.subscribe((cartData) => {
      this.cartData = cartData;
      console.log('Cart Data:', this.cartData);
      console.log("🤜 ~ cartData:", cartData)
    });
  }

  getTotalPrice(): number {
    return this.cartData.reduce((total: any, item: any) => total + ((item.pro_id.price * item.qty)), 0);
  }
  getTotalAfterShipPrice(): number {
    let total = this.cartData.reduce((total: any, item: any) => total + (item.pro_id.price * item.qty), 0);
    
    // Thêm phí vận chuyển nếu tổng tiền nhỏ hơn 150000
    if (total < 150000) {
      total += 30000;
    }
  
    return total;
  }
  


  onChange() {}


  // getDiscountPrice(){
  //   return this.cartData.reduce((total: any, item: any) => total + (item.discount_price), 0);
  // }

  checkout(idOrder: any) {
    if (this.cartData.length > 0) {
      const firstItem = this.cartData[0]; // Get the first element from cartData
      const userId = firstItem.users_id.id;  // Get the userId value


      
      const newProduct = {
        'orderName': this.checkoutForm.value.order_name,
        'orderPhone': this.checkoutForm.value.order_phone,
        'orderCity': this.checkoutForm.value.order_city,
        'orderDistrict': this.checkoutForm.value.order_district,
        'orderWard': this.checkoutForm.value.order_wards,
        'orderStreet': this.checkoutForm.value.order_street,
        'note': this.checkoutForm.value.note,
        'usersId': userId,
        'pmId': this.selectedPaymentMethod,
      };

      console.log("🤜 ~ newProduct:", newProduct)
      this.orderDetailsService.insert(newProduct).subscribe((res:any) => {
      }, (err) => {
        switch(err?.error?.text) {
          case "insertted": {
            
            this.toastService.show("Đặt hàng thành công");
            this.router.navigate(['/thankyou']);
            break;
          }
        }
      });
    }
  }
}