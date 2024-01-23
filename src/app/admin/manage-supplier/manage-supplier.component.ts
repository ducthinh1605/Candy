import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Catagory } from 'src/app/model/Catagory.model';
import { SupplierService } from 'src/app/service/supplier.service';
import { ToastService } from 'src/app/service/toast.service';
import { ManageSupplierEditComponent } from './manage-supplier-edit/manage-supplier-edit.component';
import { ManageSupplierAddNewComponent } from './manage-supplier-add-new/manage-supplier-add-new.component';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { DatePipe } from '@angular/common';
import { ImageViewComponent } from 'src/app/image-view/image-view.component';

@Component({
  selector: 'app-manage-supplier',
  templateUrl: './manage-supplier.component.html',
  styleUrls: ['./manage-supplier.component.scss']
})
export class ManageSupplierComponent implements OnInit {
  currentPage: number = 1;
  dataSup: any = [];
  supplier: any;
  constructor(
    private supplierSevice: SupplierService,
    private toastService: ToastService,
    public dialog: MatDialog,
    private elementRef: ElementRef,
    private datePipe: DatePipe
    ) {}

  formatDate(date: string | Date): string {
      return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm:ss') || '';
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
  ngOnInit(): void {
    this.getSup();
  }
  

  getSup() {
    this.supplierSevice.getSupList().subscribe(data => {
      this.dataSup = data;
    });
  }

  addSup() {
    const dialogRef = this.dialog.open(ManageSupplierAddNewComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSup();
    });
  }

  updateSup(item: any) {
    const dialogRef = this.dialog.open(ManageSupplierEditComponent, {
      width: '700px',
      data: {
        suppliers: item,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSup();
    });
  }


  deleteSup(id: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Are you sure you want to delete?`,
        message: `Confirm delete?`
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.supplierSevice.deleteSuplier(id).subscribe(res => {
        }, (err) => {
          this.getSup();
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
