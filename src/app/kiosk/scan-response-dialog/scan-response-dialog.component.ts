import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'scan-response-dialog',
  templateUrl: './scan-response-dialog.component.html',
  styleUrls: ['./scan-response-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ScanResponseDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ScanResponseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
