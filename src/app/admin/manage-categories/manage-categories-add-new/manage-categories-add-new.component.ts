import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Catagory } from 'src/app/model/Catagory.model';
import { CategoryService } from 'src/app/service/category.service';
import { ToastService } from 'src/app/service/toast.service';
import { ManageCategoriesComponent } from '../manage-categories.component';

@Component({
  selector: 'app-manage-categories-add-new',
  templateUrl: './manage-categories-add-new.component.html',
  styleUrls: ['./manage-categories-add-new.component.scss']
})
export class ManageCategoriesAddNewComponent  {
  categories: any;

  addNewForm: any = this.fb.group({
    name: ['', Validators.required],
  });


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<ManageCategoriesAddNewComponent>,

  ) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  add() {
    const newCategory = {
      'name': this.addNewForm.value.name,
    }

    this.categoryService.addCategory(newCategory).subscribe(res => {
    }, (err) => {
      switch(err?.error?.text) {
        case "inserted": {
          this.toastService.show(`Add ${newCategory?.name} successfully!`);
          this.clearForm();
          break;
        }
      }
    })
  }

  clearForm() {
    this.addNewForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

}
