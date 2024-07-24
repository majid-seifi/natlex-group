import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {ChartEntity} from "../models/chart-entity.model";
import {ChartService} from "../services/chart.service";
import {MatButton, MatIconButton} from "@angular/material/button";
import {ChartFormComponent} from "./chart-form/chart-form.component";
import {MatDialog} from "@angular/material/dialog";
import {NgStyle} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButton,
    NgStyle,
    MatIconButton,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.less',
})
export class SettingsComponent implements AfterViewInit {
  chartService = inject(ChartService);
  dialog = inject(MatDialog);
  displayedColumns: string[] = ['name', 'type', 'color', 'actions'];
  dataSource = new MatTableDataSource<ChartEntity>(this.data);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  get data() {
    let data = [...this.chartService.charts()];
    if (!data.length)
      data = [{name: 'No Data Available'}];

    return data.reverse();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  add() {
    const dialogRef = this.dialog.open(ChartFormComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.refresh();
    });
  }

  edit(entity: ChartEntity) {
    const dialogRef = this.dialog.open(ChartFormComponent, {
      data: entity,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refresh();
    });
  }

  remove(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.chartService.delete(id);
        this.refresh();
      }
    });
  }

  refresh() {
    this.dataSource.data = this.data;
  }
}
