import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from '../service/toast.service';
import jwt_decode from 'jwt-decode';
import { CartService } from '../service/cart.service';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  product:any;
  qty:any;
  hrefMyCart: string = '';
  isHidenBadge: boolean = false;
  cartItemsQuantity: number = 0;

  constructor(
    private router: Router,
    private toastService: ToastService,
    private cookieService: CookieService,
    private cartService: CartService,
    private authService: AuthService,
    private userService: UserService,
    private productService: ProductService,

    
  ) {}

  ngOnInit(): void {
    this.authService.userData$.subscribe((userData) => {
      if (userData) {
        this.currentUser = userData;
        this.getUserInfo(this.currentUser?.account, this.currentUser?.password);

        this.isHidenBadge = this.cartItemsQuantity <= 0;
        this.cartService.cartItem$.subscribe(cart => {
          this.getCartItemsQuantity();
        });
      }
    });
  }

  getUserInfo(account: string, password:string){
    this.userService.getuserinfo({account,password}).subscribe((data) =>{
      this.currentUser = data;
      console.log("🤜 ~ this.currentUser:", this.currentUser)
      this.getCartItemsQuantity();
    })
  }
  getCartItemsQuantity() {
    console.log("🤜 ~ this.currentUser.id:", this.currentUser.id)
    this.cartService.getCarts(this.currentUser.id).subscribe((res: any) => {
      this.cartItemsQuantity = res?.reduce(
        (totalQty: number, cartItem: any) =>
        totalQty + (cartItem.qty || 0)
        ,0);

      this.isHidenBadge = this.cartItemsQuantity <= 0;
      this.cartService.updateCartData(res);
    });
  }

  reloadCurrentRoute() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home']);
    });
  }
  userinfo() {
    if (this.currentUser) {
      this.router.navigate(['/user'], { state: { user: this.currentUser } });
    }
  }
  
  logOut() {
    this.authService.logout(); // Gọi phương thức logout từ AuthService
    this.cookieService.deleteAll();
    this.reloadCurrentRoute();
    this.toastService.show('Logout successfully!');
  }
  openCart() {
    if (!this.authService.isLoggedIn()) {
      this.toastService.show('Bạn cần đăng nhập để mở giỏ hàng')
    } else {
      // Thực hiện hành động mở giỏ hàng
    }
    this.router.navigate(['/cart']);
  }
  

  login() {
    this.router.navigate(['/login']);
  }
  onSearch(keyword: string) {
    this.productService.searchProduct(keyword).subscribe((result) => {
      this.router.navigate(['/shop'], { queryParams: { keyword: keyword } });
    });
  }
}

