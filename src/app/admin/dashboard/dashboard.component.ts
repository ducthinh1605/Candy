import { Component, OnInit } from '@angular/core';
import { NavItems } from '../constants/admin.constant';
import { UserService } from 'src/app/service/user.service';
import { CategoryService } from 'src/app/service/category.service';
import { SupplierService } from 'src/app/service/supplier.service';
import { combineLatest } from 'rxjs';
import { ProductService } from 'src/app/service/product.service';
import { ProductIMGService } from 'src/app/service/product_img.service';
import { OrderService } from 'src/app/service/order.service';
import { AuthService } from 'src/app/service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/service/toast.service';
import { NewsService } from 'src/app/service/news.service';
import { ContactService } from 'src/app/service/contact.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  readonly NAV_ITEM = NavItems;
  status: boolean = false;
  sessison: string = this.NAV_ITEM.Dashboard;
  title: string = this.NAV_ITEM.Dashboard;
  currentAdmin: any;
  userTotal: any = 0;
  categoryTotal: any = 0;
  productTotal: any = 0;
  productImgTotal: any = 0;
  supplierTotal: any = 0;
  orderTotal: any = 0;
  newsTotal:any=0;
  contactTotal:any=0;

  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private supplierService: SupplierService,
    private productimgService: ProductIMGService,
    private orderService: OrderService,
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private toastService: ToastService,
    private newsService: NewsService,
    private contactService: ContactService,
  ) {}

  ngOnInit(): void {
    // 
    this.authService.adminData$.subscribe((adminData) => {
      if (adminData) {
        this.currentAdmin = adminData;
        this.getAdmininfo(this.currentAdmin?.account, this.currentAdmin?.password);
        this.getData();
      }
    });
  }

  getData() {
    combineLatest([
      this.userService.getTotal(),
      this.categoryService.getTotal(),
      this.productService.getTotal(),
      this.productimgService.getTotal(),
      this.supplierService.getTotal(),
      this.orderService.getTotal(),
      this.newsService.getTotal(),
      this.contactService.getTotal(),

     
    ]).subscribe(([userTotal, categoryTotal, productTotal,productImgTotal, supplierTotal, orderTotal,newsTotal,contactTotal]) => {
      this.userTotal = userTotal;
      this.categoryTotal = categoryTotal;
      this.productTotal = productTotal;
      this.productImgTotal = productImgTotal;
      this.supplierTotal= supplierTotal;
      this.orderTotal = orderTotal;
      this.newsTotal = newsTotal;
      this.contactTotal = contactTotal;
    })
  }

  navigate(session: string) {
    switch(session) {
      case this.NAV_ITEM.ManageUsers: {
        this.onChangeSession(this.NAV_ITEM.ManageUsers);
        break;
      }
      case this.NAV_ITEM.ManageCategories: {
        this.onChangeSession(this.NAV_ITEM.ManageCategories);
        break;
      }
      case this.NAV_ITEM.ManageProducts: {
        this.onChangeSession(this.NAV_ITEM.ManageProducts);
        break;
      }
      case this.NAV_ITEM.ManageProductimg: {
        this.onChangeSession(this.NAV_ITEM.ManageProductimg);
        break;
      }
      case this.NAV_ITEM.ManageSupplier: {
        this.onChangeSession(this.NAV_ITEM.ManageSupplier);
        break;
      }
      case this.NAV_ITEM.ManageOrder: {
        this.onChangeSession(this.NAV_ITEM.ManageOrder);
        break;
      }
      case this.NAV_ITEM.ManageNews: {
        this.onChangeSession(this.NAV_ITEM.ManageNews);
        break;
      }
      case this.NAV_ITEM.ManageContact: {
        this.onChangeSession(this.NAV_ITEM.ManageContact);
        break;
      }
      case this.NAV_ITEM.statistical: {
        this.onChangeSession(this.NAV_ITEM.statistical);
        break;
      }
    }
  }

  addToggle() {
    this.status = !this.status;
  }

  onChangeSession(session: string): void {
    this.sessison = session;
    this.title = session;
    this.getData();
  }
  getAdmininfo(account: string, password: string) {
    this.userService.getadmininfo({ account, password }).subscribe((data) => {
      this.currentAdmin = data;
      console.log("🤜 ~ currentAdmin:", this.currentAdmin)
      
    });
  }
  logOut() {
    this.authService.adminlogout(); // Gọi phương thức logout từ AuthService
    this.cookieService.deleteAll();
    this.router.navigate(['/adminlogin']);
    this.toastService.show('Logout successfully!');
  }  
}
