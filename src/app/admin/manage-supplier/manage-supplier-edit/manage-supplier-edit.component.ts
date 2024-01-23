
  import { Component, Inject } from '@angular/core';
  import { FormBuilder, Validators } from '@angular/forms';
  import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
  import { Router } from '@angular/router';
  import { SupplierService } from 'src/app/service/supplier.service';
  import { ToastService } from 'src/app/service/toast.service';
    
    @Component({
      selector: 'app-manage-supplier-edit',
      templateUrl: './manage-supplier-edit.component.html',
      styleUrls: ['./manage-supplier-edit.component.scss']
    })
    export class ManageSupplierEditComponent {
      supplier: any;
      editForm: any;
      uploadedImageUrl: any;
    
      constructor(
        private router: Router,
        private fb: FormBuilder,
        private toastService: ToastService,
        public dialogRef: MatDialogRef<ManageSupplierEditComponent>,
        private supplierService: SupplierService,
        @Inject(MAT_DIALOG_DATA) public dataSup: { suppliers: any},
      ) {}
    
      ngOnInit(): void {
        this.supplier = this.dataSup.suppliers;
        console.log("🤜 ~ data:", this.dataSup)
        this.buildForm();
      }

      buildForm() {
        this.editForm = this.fb.group({
          name: [this.supplier.name, Validators.required],
          // img: [this.supplier.img, Validators.required],
          website: [this.supplier.website, Validators.required],
          description: [this.supplier.description, Validators.required],
        });
      }
      
    
      onNoClick(): void {
        this.dialogRef.close();
      }
      onUploadComplete(info: any) {
        this.uploadedImageUrl = info.cdnUrl;
        console.log("🤜 ~ info.cdnUrl:", info.cdnUrl)
        
      }
    
    clearForm() {
      this.editForm = this.fb.group({
      name: ['', Validators.required],
      // img: ['', Validators.required],
      website: ['', Validators.required],
      description: ['', Validators.required],
  });
}

    
      edit() {
        const newSupplier = {  
          "id": this.supplier?.id,
          'name': this.editForm.value.name,
          // 'img': this.editForm.value.img,
          'img': this.uploadedImageUrl,
          'website': this.editForm.value.website,
          'description': this.editForm.value.description,
        }
    
        this.supplierService.updateSupplier(newSupplier).subscribe(res => {
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
    