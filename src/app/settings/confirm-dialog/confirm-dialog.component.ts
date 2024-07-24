import {Component} from '@angular/core';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButton],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.less'
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
