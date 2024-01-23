
import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators,  FormControl,FormGroup} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/service/toast.service';
import { ProductIMGService } from 'src/app/service/product_img.service';



@Component({
  selector: 'app-product-img-add',
  templateUrl: './product-img-add.component.html',
  styleUrls: ['./product-img-add.component.scss']
})
export class ProductImgAddComponent {
  product: any;

  addNewForm: any = this.fb.group({
    img: ['', Validators.required],
    product: ['', [Validators.required]],
  });
 
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<ProductImgAddComponent>,
    private productimgService: ProductIMGService,
    @Inject(MAT_DIALOG_DATA) public data: {product: any },

  ) {}
    

  ngOnInit(): void {
    this.product = this.data.product;
    console.log("🤜 ~ data:", this.data)
  }
  onChangeProduct() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clearForm() {
    this.addNewForm = this.fb.group({
    img: ['', [Validators.required]],
    product: ['', [Validators.required]],
    });
  }

  add() {
    const newProductImg = {
      
      'img': this.addNewForm.value.img,
      'proId': this.addNewForm.value.product,
    }

    this.productimgService.add(newProductImg).subscribe(res => {
    }, (err) => {
      switch(err?.error?.text) {
        case "inserted": {
          this.toastService.show(`Add successfully!`);
          this.clearForm();
          break;
        }
      }
    })
  }
}
