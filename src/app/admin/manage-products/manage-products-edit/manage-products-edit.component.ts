import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { ToastService } from 'src/app/service/toast.service';
import { ManageUserAddComponent } from '../../manage-users/manage-user-add/manage-user-add.component';

@Component({
  selector: 'app-manage-products-edit',
  templateUrl: './manage-products-edit.component.html',
  styleUrls: ['./manage-products-edit.component.scss']
})
export class ManageProductsEditComponent {
  categories: any;
  suppliers: any;
  product: any;
  uploadedImageUrl: any;
  editForm: any;
  

  ngOnInit(): void {
    this.categories = this.data.categories;
    this.suppliers=this.data.suppliers;
    this.product = this.data.product;
    console.log("🤜 ~ data:", this.data)
    this.buildForm();
  }


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<ManageProductsEditComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: { categories: any, suppliers:any, product: any,},
  ) {}
   

  
  
  buildForm() {
    this.editForm = this.fb.group({
    name: [this.product.name, Validators.required],
    pakage: [this.product.pakage, Validators.required],
    price: [this.product.price, [Validators.required]],
    qty: [this.product.qty, [Validators.required,Validators.min(0)]],
    subImages: this.fb.array([]),
    description: [this.product.description, [Validators.required]],
    expied: new FormControl(this.product.expired, [Validators.required, this.validateDate]),
    category: [this.product.category?.id, [Validators.required]],
    supplier: [this.product.sup?.id, [Validators.required]],
    });
  }
  validateDate(control: FormControl): { [key: string]: boolean } | null {
    const inputDate = control.value;
    const currentDate = new Date(); // Ngày hiện tại
  
    if (inputDate) {
      const date = new Date(inputDate);
      console.log('Input Date:', date); // Kiểm tra xem hàm validateDate được gọi khi nhập dữ liệu
      if (date < currentDate) {
        console.log('Invalid Date:', date); // Kiểm tra xem ngày nhập vào có nhỏ hơn ngày hiện tại không
        return { invalidDate: true, pastDate: true };
      }
    }
  
    return null;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onUploadComplete(info: any) {
    this.uploadedImageUrl = info.cdnUrl;
    console.log("🤜 ~ info.cdnUrl:", info.cdnUrl)
    
  }
  onSubImageUploadComplete(info: any) {
    const subImages = this.editForm.get('subImages') as FormArray;
    subImages.push(this.fb.control(info.cdnUrl));
  }

  clearForm() {
    this.editForm = this.fb.group({
    name: ['', Validators.required],
    pakage: ['', Validators.required],
    price: ['', [Validators.required]],
    qty: ['', [Validators.required]],
    img: ['', [Validators.required]],
    description: ['', [Validators.required]],
    expied: ['', [Validators.required]],
    category: ['', [Validators.required]],
    supplier: ['', [Validators.required]],
    });
  }

  edit() {
    const newProduct = {
      "id": this.product?.id,
      'name': this.editForm.value.name,
      'pakage': this.editForm.value.pakage,
      'price': this.editForm.value.price,  
      'qty': this.editForm.value.qty,  
      'img': this.uploadedImageUrl,
      'description':this.editForm.value.description, 
      'expied': this.editForm.value.expied,
      'cate_id': this.editForm.value.category,
      'sup_id': this.editForm.value.supplier,
      'images': this.editForm.value.subImages,
    }

    this.productService.update(newProduct).subscribe(res => {
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
