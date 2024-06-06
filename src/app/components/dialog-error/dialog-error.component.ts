import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-error',
  templateUrl: './dialog-error.component.html',
  styleUrls: ['./dialog-error.component.scss']
})
export class DialogErrorComponent implements OnInit {
  city: string = '';

  constructor(
    private dialogRef: MatDialogRef<DialogErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    this.showErrorMessage();
  }


  showErrorMessage() {
    this.city = this.data.city;
  }


  close() {
    this.dialogRef.close();
  }

}
