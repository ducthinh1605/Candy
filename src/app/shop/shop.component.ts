import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Catagory } from './../model/Catagory.model';
import { CategoryService } from '../service/category.service';
import { SupplierService } from '../service/supplier.service';
import { ProductService } from '../service/product.service';
import { Product } from './../model/product.model';
import { CartService } from '../service/cart.service';
import { ToastService } from '../service/toast.service';
// import jwt_decode from 'jwt-decode';
// import { CookieService } from 'ngx-cookie-service';
import { LoadingService } from '../service/loading.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  categoryId: string = '';
  categoryData: any;
  supplierId: string = '';
  supplierData: any = {};
  

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

  currentUser: any;
  keyword: string | null = '';


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private productService: ProductService,
    private cartService: CartService,
    private toastService: ToastService,
    // private cookieService: CookieService,
    public loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadingService.showLoading();
    this.route.queryParams.subscribe(params => {
      this.categoryId = params['categoryId'];
      this.categoryService.getCateById(this.categoryId)
        .subscribe((data: Catagory) => {
          this.categoryData = data;
          console.log("🤜 ~ data:", data)
          this.getProducts();
        });

      this.supplierId = params['supplierId'];
      this.supplierService.getSupbyID(this.supplierId)
        .subscribe((data: any) => {
          this.supplierData = data;
          console.log("🤜 ~ data:", data)
          this.getProductsBySupplier();
        });
    });
  }

  addToCart(product: any) {
    this.loadingService.showLoading();
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
          this.loadingService.hideLoading();
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
    const categoryParam: {} = {
      name: this.categoryData?.name,
    }

    this.productService.getByCategory(categoryParam).subscribe((data) => {
      this.products = data as Product[];
      this.productsOriginal = this.products;
      this.totalItems = this.products.length;
      this.loadingService.hideLoading();
    })
  }
  getProductsBySupplier() {
    this.loadingService.showLoading();
    const supplierParam: {} = {
      name: this.supplierData?.name,
    }

    this.productService.getBySupplier(supplierParam).subscribe((data) => {
      this.products = data as Product[];
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
