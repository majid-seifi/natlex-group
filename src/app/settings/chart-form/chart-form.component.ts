import {Component, inject, Inject} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {ChartService} from "../../services/chart.service";

@Component({
  selector: 'app-chart-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButton,
    MatDialogModule,
    MatSelectModule,
  ],
  templateUrl: './chart-form.component.html',
  styleUrl: './chart-form.component.less'
})
export class ChartFormComponent {
  readonly chartTypes = ['line', 'spline', 'area', 'bar', 'column'];
  readonly nameControl = new FormControl('', [Validators.required]);
  readonly typeControl = new FormControl('line', [Validators.required]);
  readonly colorControl = new FormControl('#2378fc', [Validators.required]);
  readonly form = inject(FormBuilder).group({
    name: this.nameControl,
    type: this.typeControl,
    color: this.colorControl,
  });

  constructor(
    public dialogRef: MatDialogRef<ChartFormComponent>,
    private chartService: ChartService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data)
      this.form.patchValue(data);
  }

  get formValue(): any {
    return this.form.value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    if (this.data?.id)
      this.chartService.edit({
        id: this.data?.id,
        ...this.formValue
      });
    else
      this.chartService.add(this.formValue);
    this.dialogRef.close();
  }
}
