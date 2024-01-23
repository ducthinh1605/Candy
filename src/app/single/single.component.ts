  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
  import { ProductService } from '../service/product.service';
  import { Product } from './../model/product.model';
  import { CartService } from '../service/cart.service';
  import { ToastService } from '../service/toast.service';
  import { CookieService } from 'ngx-cookie-service';
  import { MatDialog } from '@angular/material/dialog';
  import jwt_decode from 'jwt-decode';
  import { LoadingService } from '../service/loading.service';
  import { CategoryService } from '../service/category.service';
  import { SupplierService } from '../service/supplier.service';
  import { ProductIMGService } from '../service/product_img.service';
  import { AuthService } from '../service/auth.service';
  import { ImageViewComponent } from 'src/app/image-view/image-view.component';
  import { UserService } from '../service/user.service';

  @Component({
    selector: 'app-single',
    templateUrl: './single.component.html',
    styleUrls: ['./single.component.scss']
  })
  export class SingleComponent implements OnInit {
    productId: any;
    product: any;
    productIMG:any;
    categories: any;
    suppliers:any;
    currentUser: any;
    quantity: number = 1;
    similarProducts: Product[] = []; 

    constructor(
      private route: ActivatedRoute,
      private productService: ProductService,
      private userService: UserService,
      private cartService: CartService,
      private toastService: ToastService,
      private cookieService: CookieService,
      private router: Router,
      public loadingService: LoadingService,
      private categoryService: CategoryService,
      private supplierService: SupplierService,
      private productimgService: ProductIMGService,
      private authService: AuthService,
      public dialog: MatDialog,
    ) { }

    ngOnInit() {
      this.authService.userData$.subscribe((userData) => {
        if (userData) {
          this.currentUser = userData;
        }
      });
      this.route.queryParams.subscribe(params => {
        this.productId = params['productId'];

        
        this.productService.getById(this.productId).subscribe((data) => {
          this.product = data as Product;
          // Gọi service getProductImagesById để lấy productIMG
          this.productService.getProductImagesById(this.productId).subscribe((images) => {
            this.productIMG = images; // Gán kết quả lấy được vào biến productIMG
            this.loadingService.hideLoading();

            this.productService.getProductSmiliar(this.productId).subscribe((similarProds) => {
              this.similarProducts = similarProds; // Lưu danh sách sản phẩm tương tự
          });
        });
      });
    });
    }
    
    
    handelQuantity(action: string) {
      if(action === 'down' && this.quantity >= 2) {
        this.quantity--;
        return;
      }

      if(action === 'up') {
        this.quantity++;
        return;
      }
    }

    addToCart() {
      this.loadingService.showLoading();
      console.log("🤜 ~ user.this.currentUser:", this.currentUser)

      const user = {
        account: this.currentUser.account,
        password: this.currentUser.password,
      }

      this.userService.getuserinfo(user).subscribe(res => {
        const cart = {
          userid: res.id,
          productid: this.product.id,
          quantity: this.quantity,
        }
        this.cartService.add(cart).subscribe(res => {
        }, (err) => {
          switch(err?.error?.text) {
            case 'inserted': {
              this.cartService.oncartChange(err?.error?.text);
              this.loadingService.hideLoading();
              this.toastService.show(`Added ${this.product?.name} to the cart!`);
              break;
            }
            case 'insert fail': {
              this.toastService.show(`Số lượng sản phẩm bạn cần vượt quá số lượng tồn kho `);
              break;
            }
          }
        })
      })
      
      
    }

    viewImage(url: string) {
      const dialogRef = this.dialog.open(ImageViewComponent, {
        width: '600px',
        height: '600px',
        data: {
          imageUrl: url
        }
      });
    }
    navigateToProduct(productId: any) {
      const navigationExtras: NavigationExtras = {
        queryParams: { productId: productId }
      };
      this.router.navigate(['/single'], navigationExtras);
    }
    
  }
