import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Catagory } from 'src/app/model/Catagory.model';
import { CategoryService } from 'src/app/service/category.service';
import { ToastService } from 'src/app/service/toast.service';
import { ManageCategoriesAddNewComponent } from './manage-categories-add-new/manage-categories-add-new.component';
import { ManageCategoriesEditComponent } from './manage-categories-edit/manage-categories-edit.component';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss']
})
export class ManageCategoriesComponent implements OnInit {
  currentPage: number = 1;
  dataCategory: any = [];
  categories: any;

  constructor(
    private categoryService: CategoryService,
    private toastService: ToastService,
    public dialog: MatDialog,
    private elementRef: ElementRef,
    private datePipe: DatePipe
    ) {}
    formatDate(date: string | Date): string {
      return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm:ss') || '';
    }
  ngOnInit(): void {
    this.getCategory();
  }
  

  getCategory() {
    this.categoryService.getCategoryList().subscribe(data => {
      this.dataCategory = data;
    });
  }

  addCategory() {
    const dialogRef = this.dialog.open(ManageCategoriesAddNewComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCategory();
    });
  }

  updateCategory(item: any) {
    const dialogRef = this.dialog.open(ManageCategoriesEditComponent, {
      width: '700px',
      data: {
        categories: item,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCategory();
    });
  }


  deleteCategory(id: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Are you sure you want to delete?`,
        message: `Confirm delete?`
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService.deleteCategory(id).subscribe(res => {
        }, (err) => {
          this.getCategory();
          switch(err?.error?.text) {
            case 'deleted': {
              this.toastService.show('Delete Successfully!!!', 'err');
              break;
            }
          }
          }
        )
      }
    });
  }

}
