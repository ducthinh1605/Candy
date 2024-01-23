import { DatePipe } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { ContactService } from 'src/app/service/contact.service';
import { ToastService } from 'src/app/service/toast.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-manage-contact',
  templateUrl: './manage-contact.component.html',
  styleUrls: ['./manage-contact.component.scss'],
})
export class ManageContactComponent {
  currentPage: number = 1;
  dataContact: any = [];
  supplier: any;
  constructor(
    private contactService: ContactService,
    private toastService: ToastService,
    public dialog: MatDialog,
    private elementRef: ElementRef,
    private datePipe: DatePipe
    ) {}

  formatDate(date: string | Date): string {
      return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm:ss') || '';
    }

  ngOnInit(): void {
    this.getContact();
  }
  

  getContact() {
    this.contactService.getContact().subscribe(data => {
      this.dataContact = data;
      console.log("🤜 ~ dataContact:", this.dataContact)
    });
  }
  edit(idStatus: any, status: number) {

    const newStatus = {
      contactId: idStatus.id,
      status: status,
    }
    this.contactService.setStatus(newStatus).subscribe(res => {
    }, (err) => {
      switch(err?.error?.text) {
        case "updated": {
          this.toastService.show('Update successfully!');
          break;
        }
      }
    })
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
        this.contactService.delete(id).subscribe(res => {
        }, (err) => {
          this.getContact();
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
