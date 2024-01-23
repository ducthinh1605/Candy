import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User.model';
import { ToastService } from 'src/app/service/toast.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-manage-user-add',
  templateUrl: './manage-user-add.component.html',
  styleUrls: ['./manage-user-add.component.scss']
})
export class ManageUserAddComponent implements OnInit{
  hide = true;

  user: any;

  registerForm: any = this.fb.group({
    name: ['', Validators.required],
    account: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    private userService: UserService,
    public dialogRef: MatDialogRef<ManageUserAddComponent>,

  ) {}

  ngOnInit(): void {
  }

  getUsers() {
    this.userService.getAll().subscribe((res: any) => {
      this.user = res;
    })
  }

  onChangeCategory() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  register() {
    const user: User = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      account: this.registerForm.value.account,
      phone: this.registerForm.value.phone,
      password: this.registerForm.value.password,
    }
    console.log('🌷🌷🌷 ~ user: ', user)

    this.userService.register(user).subscribe(res => {
    }, (err) => {
      switch(err?.error?.text) {
        case 'insert fail': {
          this.toastService.show('Account already exists', 'err');
          break;
        }
        case 'inserted': {
          this.toastService.show('Addition successfully!');
          this.router.navigate(['admin']);
          break;
        }
      }
    })
  }
}
