
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductIMGService } from 'src/app/service/product_img.service';
import { ToastService } from 'src/app/service/toast.service';


@Component({
  selector: 'app-producc-img-update',
  templateUrl: './producc-img-update.component.html',
  styleUrls: ['./producc-img-update.component.scss']
})
export class ProduccImgUpdateComponent {
  productIMG:any;
  product: any;
  editForm: any;
  

  ngOnInit(): void {
    this.productIMG = this.data.productIMG;
    this.product = this.data.product;
    console.log("🤜 ~ data:", this.data);
    this.buildForm();
  }
  


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<ProduccImgUpdateComponent>,
    private productimgService: ProductIMGService,
    @Inject(MAT_DIALOG_DATA) public data: { productIMG:any, product: any,},
  ) {}
   

  
  
  buildForm() {
    this.editForm = this.fb.group({
    img: [this.productIMG?.img, [Validators.required]],
    product: [this.productIMG.pro_id?.id, [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clearForm() {
    this.editForm = this.fb.group({
    img: ['', [Validators.required]],
    product: ['', [Validators.required]],
    });
  }

  edit() {
    const newProductImg = {
      "id": this.productIMG?.id,
      'img': this.editForm.value.img, 
      'proId': this.editForm.value.product
    }

    this.productimgService.update(newProductImg).subscribe(res => {
    }, (err) => {
      switch(err?.error?.text) {
        case "updated": {
          this.toastService.show(`Update successfully!`);
          this.clearForm();
          break;
        }
      }
    })
  }
}
