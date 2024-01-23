import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Catagory } from '../model/Catagory.model';
import { CategoryService } from '../service/category.service';
import { Product } from '../model/product.model';
import { ProductService } from '../service/product.service';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingService } from '../service/loading.service';
import { NewsService } from '../service/news.service';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isProductSession: boolean = false;
  category: any;
  news:any;
  data: Catagory[]=[];
  products: Product[] = [];
  topSell: Product[] = [];

  @Output() clickCategoryEvent = new EventEmitter<string>();

  constructor(
    private categoryList: CategoryService,
    private productService: ProductService,
    private router: Router,
    public loadingService: LoadingService,
    public newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.getCatagory();
    this.getProducts();
    this.getNews();
    this.getTopSellingProducts();
  }

  navigateDetails(product: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: { productId: product.id }
    };

    this.router.navigate(['/single'], navigationExtras);
  }

  getProducts() {
    this.loadingService.showLoading();
    this.productService.getProduct().subscribe((data) => {
      this.products = data as Product[];
      console.log("🤜 ~ products:", this.products)
      this.loadingService.hideLoading();
    })
  }

  getCatagory() {
    this.loadingService.showLoading();
    this.categoryList.getCategoryList()
    .subscribe((data: Catagory[]) => {
      this.data = data;
      this.loadingService.hideLoading();
    });
  }

  onCategoryChange(value: any) {
    this.category = value;
    this.isProductSession = true;
  }
  getNews() {
    this.loadingService.showLoading();
    this.newsService.getNews().subscribe((data) => {
      console.log("Received data:", data); // Kiểm tra dữ liệu nhận được từ API
      this.news = data;
      this.loadingService.hideLoading();
    });
  }
  
  detailsNews(selectedNews: any) {
    const newsId = selectedNews?.id; // Lấy ID của tin tức từ đối tượng tin tức được chọn
    const navigationExtras: NavigationExtras = {
      queryParams: { newsId }
    };
    this.router.navigate(['/news'], navigationExtras);
  }
  getTopSellingProducts() {
    this.loadingService.showLoading();
    this.productService.getProductTopSale().subscribe((data) => {
      this.topSell = data as Product[];
      console.log("🤜 ~ topSel:", this.topSell)
      
      this.loadingService.hideLoading();
    });
  }
  
  
  
}
