import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/service/toast.service';
import { UserService } from 'src/app/service/user.service';
import { ManageUserAddComponent } from '../manage-user-add/manage-user-add.component';

@Component({
  selector: 'app-manage-user-edit',
  templateUrl: './manage-user-edit.component.html',
  styleUrls: ['./manage-user-edit.component.scss']
})
export class ManageUserEditComponent implements OnInit {
  user: any;
  roleUser: any = ['admin', 'user'];
  editForm: any;

  ngOnInit(): void {
    this.user = this.data.user;
    this.buildForm();
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<ManageUserEditComponent>,
    private usertService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: { user: any },
    ) {}

  buildForm() {
    this.editForm = this.fb.group({
        name: [this.user?.name , Validators.required],
        email: [this.user?.email, [Validators.required]],
        account: [this.user?.account, [Validators.required]],
        password: [this.user?.password, [Validators.required]],
        phone: [this.user?.phone, [Validators.required]],
    });
  }


  onEdit() {
    const newUser = {
      "id": this.user?.id,
      'name': this.editForm.value.name,
      'email': this.editForm.value.email,
      'account': this.editForm.value.account,
      'phone': this.editForm.value.phone,
      'password': this.editForm.value.password,
    }

    this.usertService.editUser(newUser).subscribe(res => {
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  clearForm() {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required]],
      account: ['', [Validators.required]],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  }
}
