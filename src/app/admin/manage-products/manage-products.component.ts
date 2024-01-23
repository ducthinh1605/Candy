import { Component, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from 'src/app/service/category.service';
import { SupplierService } from 'src/app/service/supplier.service';
import { ProductService } from 'src/app/service/product.service';
import { ToastService } from 'src/app/service/toast.service';
import { ManageProductsAddNewComponent } from './manage-products-add-new/manage-products-add-new.component';
import { ImageViewComponent } from 'src/app/image-view/image-view.component';
import { ManageProductsEditComponent } from './manage-products-edit/manage-products-edit.component';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { DatePipe } from '@angular/common';
import { ProductIMGService } from 'src/app/service/product_img.service';
@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent {
  products: any = [];
  categories: any;
  suppliers:any;
  product_img:any;
  currentPage: number = 1;
  isSortAscending: boolean = true;
  

  constructor(
    private toastService: ToastService,
    public dialog: MatDialog,
    private elementRef: ElementRef,
    private productService: ProductService,
    private categoryService: CategoryService,
    private SupplierService: SupplierService,
    private productIMGService: ProductIMGService,
    private datePipe: DatePipe
  ){}

  formatDate(date: string | Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm:ss') || '';
  }
  
  ngOnInit(): void {
    this.getCategory();
    this.getSupplier();
    this.getProductIMG();
  }

  // getProducts() {
  //   this.productService.getProduct().subscribe((res: any) => {
  //     this.products = res;
  //     console.log("🤜 ~ res:", res)
  //   })
  // }
  getProducts() {
    this.productService.getProduct().subscribe((res: any) => {
      this.products = res;
  
      // Lấy danh sách ảnh cho từng sản phẩm
      this.products.forEach((product: any) => {
        const productId = product.id;
        // Gọi service để lấy danh sách ảnh từ productIMG theo pro_id
        this.productIMGService.getByProductId(productId).subscribe((images: any) => {
          // Gán danh sách ảnh vào thuộc tính mới của sản phẩm
          product.productImages = images;
        });
      });
  
      console.log("🤜 ~ this.products:", this.products);
    });
  }

  getNewestProduct() {
    this.productService.getNewestProduct().subscribe((res: any) => {
      this.products = res;
  
      // Lấy danh sách ảnh cho từng sản phẩm
      this.products.forEach((product: any) => {
        const productId = product.id;
        // Gọi service để lấy danh sách ảnh từ productIMG theo pro_id
        this.productIMGService.getByProductId(productId).subscribe((images: any) => {
          // Gán danh sách ảnh vào thuộc tính mới của sản phẩm
          product.productImages = images;
        });
      });
    });
  }
  GetProductsByExpiration() {
    this.productService.GetProductsByExpiration().subscribe((res: any) => {
      this.products = res;
  
      // Lấy danh sách ảnh cho từng sản phẩm
      this.products.forEach((product: any) => {
        const productId = product.id;
        // Gọi service để lấy danh sách ảnh từ productIMG theo pro_id
        this.productIMGService.getByProductId(productId).subscribe((images: any) => {
          // Gán danh sách ảnh vào thuộc tính mới của sản phẩm
          product.productImages = images;
        });
      });
    });
  }
  onSortButtonClick() {
    if (this.isSortAscending) {
      // Gọi hàm để lấy danh sách sản phẩm mới nhất
      this.getNewestProduct();
    } else {
      // Gọi hàm để lấy danh sách sản phẩm như cũ
      this.getProducts();
    }

    // Đảo ngược trạng thái sắp xếp
    this.isSortAscending = !this.isSortAscending;
  }
  onExpiredButtonClick() {
    if (this.isSortAscending) {
      // Gọi hàm để lấy danh sách sản phẩm mới nhất
      this.GetProductsByExpiration();
    } else {
      // Gọi hàm để lấy danh sách sản phẩm như cũ
      this.getProducts();
    }

    // Đảo ngược trạng thái sắp xếp
    this.isSortAscending = !this.isSortAscending;
  }
  getProductIMG() {
    this.productIMGService.getProductIMG().subscribe((res: any) => {
      this.product_img = res;
      console.log("🤜 ~ res:", res)
    })
  }

  getCategory() {
    this.categoryService.getCategoryList().subscribe((res: any) => {
      this.categories = res;
      this.getProducts();
    })
  }

  getCategoryName(id: string): string {
    const category = this.categories.find((res: any) => res.id === id);
    return category ? category.name : '';
  }

  getSupplier() {
    this.SupplierService.getSupList().subscribe((res: any) => {
      this.suppliers = res;
      this.getProducts();    
    })
  }
  
  getSupplierName(id: string): string {
    const supplier = this.suppliers.find((res: any) => res.id === id);
    return supplier ? supplier.name : '';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
  
    // If the filter value is empty, show all products
    if (filterValue === '') {
      this.getProducts();
      return;
    }
  
    // Filter the products array based on the product name
    this.products = this.products.filter((product: any) => {
      return product.name.toLowerCase().includes(filterValue);
    });
  }
  

// Helper function to remove diacritics from a string
removeDiacritics(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

  
  
  
  formatDescription(des: string) {
    if(des?.length <= 100) {
      return des;
    }

    return des?.slice(0, 100) + ' ...';
  }

  formatTitle(title: string) {
    if(title?.length <= 50) {
      return title;
    }

    return title?.slice(0, 50) + ' ...';
  }

  add() {
    const dialogRef = this.dialog.open(ManageProductsAddNewComponent, {
      width: '700px',
      data: {
        categories: this.categories,
        suppliers:this.suppliers
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProducts();
    });
  }

  update(item: any) {
    const dialogRef = this.dialog.open(ManageProductsEditComponent, {
      width: '700px',
      data: {
        categories: this.categories,
        suppliers:this.suppliers,
        product: item
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProducts();
    });
  }

  deleteProduct(item: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Are you sure you want to delete?`,
        message: `Confirm delete?`
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.delete(item?.id).subscribe(res =>{
        }, (err) => {
          switch(err?.error?.text) {
            case 'deleted': {
              this.toastService.show(`Delete ${item?.name} successfully!`);
              this.getProducts();
              break;
            }
          }
        })
      }
    });
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
  isDateNearExpired(expiredDate: string): boolean {
    const currentDate = new Date();
    const productExpiredDate = new Date(expiredDate);
    const oneMonth = 30 * 24 * 60 * 60 * 1000; // Số mili giây trong 1 tháng
  
    const difference = productExpiredDate.getTime() - currentDate.getTime();
  
    return difference <= oneMonth && difference >= 0; // Nếu cận date và chưa hết date
  }
  
  isDateExpired(expiredDate: string): boolean {
    const currentDate = new Date();
    const productExpiredDate = new Date(expiredDate);
  
    return productExpiredDate.getTime() < currentDate.getTime(); // Nếu đã hết date
  }
  
}
