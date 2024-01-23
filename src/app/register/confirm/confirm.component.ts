import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {
  verificationCode: string = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject (MAT_DIALOG_DATA) public data:any
  ) {}

  confirm() {
    this.dialogRef.close(this.verificationCode);
  }
}
