import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { ToastService } from 'src/app/service/toast.service';
import { ManageCategoriesAddNewComponent } from '../manage-categories-add-new/manage-categories-add-new.component';

@Component({
  selector: 'app-manage-categories-edit',
  templateUrl: './manage-categories-edit.component.html',
  styleUrls: ['./manage-categories-edit.component.scss']
})
export class ManageCategoriesEditComponent {
  categories: any;
  editForm: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<ManageCategoriesEditComponent>,
    private CategoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: { categories: any},
  ) {}

  ngOnInit(): void {
    this.categories = this.data.categories;
    this.buildForm();
  }

  buildForm() {
    this.editForm = this.fb.group({
      name: [this.categories.name, Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clearForm() {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  edit() {
    const newCategory = {  
      "id": this.categories?.id,
      'name': this.editForm.value.name,
    }

    this.CategoryService.updateCategory(newCategory).subscribe(res => {
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
