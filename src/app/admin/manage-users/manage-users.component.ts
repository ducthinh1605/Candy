import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/model/User.model';
import { ToastService } from 'src/app/service/toast.service';
import { UserService } from 'src/app/service/user.service';
import { ManageUserAddComponent } from './manage-user-add/manage-user-add.component';
import { ManageUserEditComponent } from './manage-user-edit/manage-user-edit.component';
import { ImageViewComponent } from 'src/app/image-view/image-view.component';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent {
  currentPage: number = 1;
  dataUser: any = [];
  isSortAscending: boolean = true;

  ngOnInit(): void {
    this.getUsers();
  }

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    public dialog: MatDialog,
    private elementRef: ElementRef,
    private datePipe: DatePipe
  ){}

  // viewImage(url: string) {
  //   const dialogRef = this.dialog.open(ImageViewComponent, {
  //     width: '600px',
  //     height: '600px',
  //     data: {
  //       imageUrl: url
  //     }
  //   });
  // }
  formatDate(date: string | Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm:ss') || '';
  }
  
  getUsers() {
    this.userService.getAll()
    .subscribe((data: User[]) => {
      this.dataUser = data;
    });
  }
  getByName() {
    this.userService.getByName()
    .subscribe((data: User[]) => {
      this.dataUser = data;
    });
  }
  getByNewest() {
    this.userService.getNewest()
    .subscribe((data: User[]) => {
      this.dataUser = data;
    });
  }
  onSortNameButtonClick() {
    this.isSortAscending = !this.isSortAscending; // Chuyển đổi thứ tự sắp xếp
  
    if (this.isSortAscending) {
      this.getByName();
    } else {
      this.getUsers();
    }
  }
  
  onSortNewestButtonClick() {
    this.isSortAscending = !this.isSortAscending; // Chuyển đổi thứ tự sắp xếp
  
    if (this.isSortAscending) {
      this.getByNewest();
    } else {
      this.getUsers();
    }
  }
  
  addUser() {
    const dialogRef = this.dialog.open(ManageUserAddComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }

  updateUser(item: any) {
    const dialogRef = this.dialog.open(ManageUserEditComponent, {
      width: '700px',
      data: {
        user: item
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }

  deleteUser(item: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Are you sure you want to delete ${item?.name}?`,
        message: `Confirm delete?`
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser(item.id).subscribe(res => {
        }, (err) => {
          this.getUsers();
          switch(err?.error?.text) {
            case 'deleted': {
              this.toastService.show('Delete successfully', 'err');
              break;
            }
            default: {
              this.toastService.show('Something wrong', 'err');
              break;
            }
          }
          }
        )
      }
    });
  }
}




