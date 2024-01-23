import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { AuthService } from '../service/auth.service';
import { ToastService } from '../service/toast.service';
import { LoadingService } from '../service/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit{
  totalPrice: number = 0;
  cartData: any;
  currentUser: any;
  
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private toastService: ToastService,
    private loadingService: LoadingService,
    private Router: Router,
    

    ) {}

  ngOnInit(): void {
    this.loadingcart();
  }
  

  loadingcart(){
    // Subscribe để lắng nghe sự thay đổi trong dữ liệu cart
    this.cartService.cartData$.subscribe((cartData) => {
      this.cartData = cartData;
      console.log('Cart Data:', this.cartData);
    });
  }
  
  getTotalPrice(item: any): number {
    return item.qty * item.pro_id.price;
  }

  updateOrderProductDetail(item: any) {

    const cart = {
      userid: item.users_id.id,
      productid: item.pro_id.id,
      quantity: item.qty
    };

    if (item.qty === 0) {
      // Nếu qty = 0, thực hiện gọi API xóa sản phẩm khỏi giỏ hàng
      this.cartService.deleteCarts(cart).subscribe(
        res => {
          window.location.reload();
        },(err) => {
          switch(err?.error?.text) {
            case 'deleted': {
              this.toastService.show('Delete successfully', 'err');
              break;
            }
            default: {
              // this.toastService.show('Something wrong', 'err');
              break;
            }
          }
          }
      );
    } else {
      // Nếu qty > 0, thực hiện gọi API cập nhật giỏ hàng
      this.cartService.updateCart(cart).subscribe(
        (res) => {
          // Xử lý khi cập nhật thành công
        },
        (err) => {
          switch (err?.error?.text) {
            case 'updated': {
              this.toastService.show('cập nhật thành công');
              break;
            }
            default: {
              // this.toastService.show('Something wrong', 'err');
              break;
            }
          }
        }
      );
    }
  }    

  decrementQty(item: any) {
    if (item.qty > 0) {
      item.qty--;
      this.updateOrderProductDetail(item);
    }
  }

  checkout() {
    // Thực hiện các hành động khi người dùng nhấn Check Out
    // Ví dụ: chuyển hướng đến trang thanh toán, xử lý thanh toán, v.v.
    // Để mô phỏng, chuyển hướng đến một trang cụ thể (ví dụ: '/checkout')
    this.Router.navigate(['/checkout']);
  }
  
  incrementQty(item: any) {
    if (item.qty < item.pro_id.qty) { // Kiểm tra số lượng có vượt quá tồn kho không
      item.qty++;
      this.updateOrderProductDetail(item);
    } else {
      // Hiển thị thông báo hoặc thực hiện các xử lý cần thiết nếu số lượng vượt quá tồn kho
      this.toastService.show('Số lượng vượt quá tồn kho');
    }
  }
  deleteCartItem(item: any) {
    const cart = {
      userid: item.users_id.id,
      productid: item.pro_id.id,
      quantity: item.qty
    };

    // Gọi API xóa sản phẩm khỏi giỏ hàng
    this.cartService.deleteCarts(cart).subscribe(
      res => {
      },
      (err) => {
        switch (err?.error?.text) {
          case 'deleted': {
            this.loadingcart();
            this.toastService.show('Delete successfully', 'err');
            window.location.reload();
            
            break;
            
          }
          default: {
            // this.toastService.show('Something wrong', 'err');
            break;
          }
        }
      }
    );
    
  }
}
  