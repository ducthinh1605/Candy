import { Component, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductIMGService } from 'src/app/service/product_img.service';
import { ProductService } from 'src/app/service/product.service';
import { ToastService } from 'src/app/service/toast.service';
import { ImageViewComponent } from 'src/app/image-view/image-view.component';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { DatePipe } from '@angular/common';
import { ProductImgAddComponent } from './product-img-add/product-img-add.component';
import { ProduccImgUpdateComponent } from './producc-img-update/producc-img-update.component';
@Component({
  selector: 'app-manage-product-img',
  templateUrl: './manage-product-img.component.html',
  styleUrls: ['./manage-product-img.component.scss']
})
export class ManageProductImgComponent {
  productIMG: any= [];
  product: any;
  currentPage: number = 1;

  constructor(
    private toastService :ToastService,
    public dialog: MatDialog,
    private productimgService :ProductIMGService,
    private productService: ProductService,
    private datePipe: DatePipe
  ){}
  formatDate(date: string | Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm:ss') || '';
  }
  ngOnInit(): void{
    this.getProducts();
  }
  getProductIMG() {
    this.productimgService.getProductIMG().subscribe((res: any) => {
      this.productIMG = res;
    })
  }
  getProducts() {
    this.productService.getProduct().subscribe((res: any) => {
      this.product = res;
      this.getProductIMG();
    })
  }
  getProductMainIMG(id:string):string {
    const product=this.product.find((res:any)=>res.id===id);
    return product?product.img:'';
  }
  getProductName(id:string):string {
    const product=this.product.find((res:any)=>res.id===id);
    return product?product.name:'';
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
    const dialogRef = this.dialog.open(ProductImgAddComponent, {
      width: '700px',
      data: {
        product:this.product
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProductIMG();
    });
  }

  update(item: any) {
    const dialogRef = this.dialog.open(ProduccImgUpdateComponent, {
      width: '700px',
      data: {
        product: this.product,
        productIMG: item
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
        this.productimgService.delete(item?.id).subscribe(res =>{
        }, (err) => {
          switch(err?.error?.text) {
            case 'deleted': {
              this.toastService.show(`Delete successfully!`);
              this.getProductIMG();
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
  
}
