import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Product } from '../model/product.model';
import { CartService } from '../service/cart.service';
import { CategoryService } from '../service/category.service';
import { ProductService } from '../service/product.service';
import { ToastService } from '../service/toast.service';
import jwt_decode from 'jwt-decode';
import { LoadingService } from '../service/loading.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  categoryId: string = '';
  categoryData: any = {};

  rangeValue: number = 0;
  minValue: number = 0;
  maxValue: number = 0;

  paginationLength: number = 0;

  products: Product[] = [];
  productsOriginal: Product[] = [];
  productsPage: Product[] = [];

  pageCurrent: number = 1;
  productArrayFilter: number = 6;
  totalItems: number = 0;

  currentUser: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private cartService: CartService,
    private toastService: ToastService,
    // private cookieService: CookieService,
    public loadingService: LoadingService
  ){ }

  ngOnInit(): void {
    this.loadingService.showLoading();
    // const token = this.cookieService.get('token');
    // this.currentUser = jwt_decode(token);
    this.getProducts();
  }

  ngAfterViewInit() {
  }

  addToCart(product: any) {
    const cart = {
      userid: this.currentUser.id,
      productid: product.id,
      quantity: 1
    }

    this.cartService.add(cart).subscribe(res => {
    }, (err) => {
      switch(err?.error?.text) {
        case 'inserted': {
          this.cartService.oncartChange(err?.error?.text);
          this.toastService.show(`Added ${product?.title} to the cart!`);
          break;
        }
      }
    })
  }

  onRangeChange() {
    this.maxValue = this.rangeValue;
  }

  onMaxChange() {
    this.rangeValue = this.maxValue;
  }

  filterPrice() {
    this.products = this.productsOriginal.filter((product: any) => product.price >= this.minValue && product.price <= this.maxValue);
    this.totalItems = this.products.length;
  }

  clearFilter() {
    this.products = this.productsOriginal;
    this.totalItems = this.products.length;
    this.rangeValue = 0;
    this.maxValue = 0;
    this.minValue = 0;
  }

  getProducts() {
    this.loadingService.showLoading();
    this.productService.getProduct().subscribe((data) => {
      this.products = data as Product[];
      console.log("🤜 ~ data:", data)
      this.productsOriginal = this.products;
      this.totalItems = this.products.length;
      this.loadingService.hideLoading();
    })
  }

  arrayFromNumber(num: number) {
    return Array.from({length: num}, (_, i) => i);
  }

  formatTitle(title: any): string {
    if(title?.length <= 31) {
      return title;
    }

    return title?.slice(0, 32) + '...';
  }

  navigateDetails(product: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: { productId: product.id }
    };

    this.router.navigate(['/single'], navigationExtras);
  }
}
