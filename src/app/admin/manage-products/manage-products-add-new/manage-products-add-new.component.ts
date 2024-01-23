import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators,  FormControl,FormGroup, FormArray} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/service/toast.service';
import { ManageUserAddComponent } from '../../manage-users/manage-user-add/manage-user-add.component';
import { ProductService } from 'src/app/service/product.service';
import { UcWidgetModule } from 'ngx-uploadcare-widget';
import { ProductIMGService } from 'src/app/service/product_img.service';


@Component({
  selector: 'app-manage-products-add-new',
  templateUrl: './manage-products-add-new.component.html',
  styleUrls: ['./manage-products-add-new.component.scss']
})
export class ManageProductsAddNewComponent {
  categories: any;
  uploadedImageUrl: any;
  suppliers: any;
  products: any = [];

  addNewForm: any = this.fb.group({
    name: ['', Validators.required],
    package: ['', Validators.required],
    price: ['', [Validators.required]], 
    qty: ['', [Validators.required,Validators.min(0)]],
    // img: ['',[Validators.required]],
    subImages: this.fb.array([]),
    description: ['', [Validators.required]],
    expied: new FormControl('', [Validators.required, this.validateDate]),
    category: ['', [Validators.required]],
    supplier: ['', [Validators.required]],
  });
  
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
  
  

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<ManageProductsAddNewComponent>,
    private productService: ProductService,
    private productIMGService: ProductIMGService,
    @Inject(MAT_DIALOG_DATA) public dataCate: {suppliers:any ,categories: any },

  ) {}
    

  ngOnInit(): void {
    this.categories = this.dataCate.categories;
    this.suppliers= this.dataCate.suppliers;
  }
  onChangeCategory() {
  }
  onChangeSupplier() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  getProducts() {
    this.productService.getProduct().subscribe((res: any) => {
      this.products = res;
      // console.log("🤜 ~ res:", res)
    })
  }
  onUploadComplete(info: any) {
    this.uploadedImageUrl = info.cdnUrl;
    console.log("🤜 ~ info.cdnUrl:", info.cdnUrl)
    
  }
  onSubImageUploadComplete(info: any) {
    const subImages = this.addNewForm.get('subImages') as FormArray;
    subImages.push(this.fb.control(info.cdnUrl));
  }

  clearForm() {
    this.addNewForm = this.fb.group({
    name: ['', Validators.required],
    package: ['', Validators.required],
    price: ['', [Validators.required]],
    qty: ['', [Validators.required]],
    // img: ['', [Validators.required]],
    subimg: ['',[Validators.required]],
    description: ['', [Validators.required]],
    expied: ['', [Validators.required]],
    category: ['', [Validators.required]],
    supplier: ['', [Validators.required]],
    });
  }
 
//   add() {
//     const newProduct = {
//       'name': this.addNewForm.value.name,
//       'pakage': this.addNewForm.value.package,
//       'price': this.addNewForm.value.price,
//       'qty': this.addNewForm.value.qty,
//       'img': this.uploadedImageUrl,
//       'description':this.addNewForm.value.description,
//       'expied': this.addNewForm.value.expied,
//       'cate_id': this.addNewForm.value.category,
//       'sup_id': this.addNewForm.value.supplier,
//     }
//       console.log("🤜 ~ uploadedImageUrl:", this.uploadedImageUrl)
//     this.productService.add(newProduct).subscribe(res => {
//     }, (err) => {
//       switch(err?.error?.text) {
//         case "inserted": {
//           this.toastService.show(`Add ${newProduct?.name} successfully!`);
//           this.clearForm();
//           break;
//         }
//       }
//     })
//   }
// }
add() {
  const newProduct = {
    'name': this.addNewForm.value.name,
    'pakage': this.addNewForm.value.package,
    'price': this.addNewForm.value.price,
    'qty': this.addNewForm.value.qty,
    'img': this.uploadedImageUrl,
    'description': this.addNewForm.value.description,
    'expied': this.addNewForm.value.expied,
    'cate_id': this.addNewForm.value.category,
    'sup_id': this.addNewForm.value.supplier,
    'images': this.addNewForm.value.subImages,
  };

  this.productService.add(newProduct).subscribe(
    (res: any) => {
      // Xử lý khi sản phẩm được thêm thành công
      this.toastService.show(`Add ${newProduct?.name} successfully!`);
      this.clearForm();
    },
    (err) => {
      // Xử lý khi có lỗi xảy ra
      console.error('Error:', err);
      // Hiển thị thông báo lỗi hoặc thực hiện các hành động phù hợp
      this.toastService.show('An error occurred while adding the product.');
    }
  );
}
}


