
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Supplier } from 'src/app/model/Supplier.model';
import { CategoryService } from 'src/app/service/category.service';
import { ToastService } from 'src/app/service/toast.service';
import { ManageSupplierComponent } from '../manage-supplier.component';
import { SupplierService } from 'src/app/service/supplier.service';
import { UcWidgetModule } from 'ngx-uploadcare-widget';

@Component({
  selector: 'app-manage-supplier-add-new',
  templateUrl: './manage-supplier-add-new.component.html',
  styleUrls: ['./manage-supplier-add-new.component.scss']
})
export class ManageSupplierAddNewComponent  {
  suppliers: any;
  uploadedImageUrl: any;

  addNewForm: any = this.fb.group({
    name: ['', Validators.required],
    // img: ['', Validators.required],
    website: ['', Validators.required],
    description: ['', Validators.required],
  });


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    private supplierService: SupplierService,
    public dialogRef: MatDialogRef<ManageSupplierAddNewComponent>,

  ) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  add() {
    const newSupplier = {
      'name': this.addNewForm.value.name,
      // 'img': this.addNewForm.value.img,
      'img': this.uploadedImageUrl,
      'website': this.addNewForm.value.website,
      'description': this.addNewForm.value.description,
    }

    this.supplierService.addSupplier(newSupplier).subscribe(res => {
    }, (err) => {
      switch(err?.error?.text) {
        case "inserted": {
          this.toastService.show(`Add ${newSupplier?.name} successfully!`);
          this.clearForm();
          break;
        }
      }
    })
  }
  onUploadComplete(info: any) {
    this.uploadedImageUrl = info.cdnUrl;
    console.log("🤜 ~ info.cdnUrl:", info.cdnUrl)
    
  }

  clearForm() {
    this.addNewForm = this.fb.group({
      name: ['', Validators.required],
      website: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

}

