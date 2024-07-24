import {Component, OnInit} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule,} from "@angular/material/datepicker";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {HighchartsChartModule} from "highcharts-angular";
import {ChartService} from "../services/chart.service";
import {provideNativeDateAdapter} from "@angular/material/core";
import * as Highcharts from 'highcharts';
import {map} from "rxjs";
import {Axis} from "../models/chart-entity.model";
import {MatCardModule} from "@angular/material/card";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-view-mode',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    MatButton,
    MatCardModule,
    NgClass,
  ],
  templateUrl: './view-mode.component.html',
  styleUrl: './view-mode.component.less'
})
export class ViewModeComponent implements OnInit {
  charts: any[] = [];
  startDate = new FormControl();
  endDate = new FormControl();
  Highcharts: typeof Highcharts = Highcharts as any;

  constructor(private chartService: ChartService) {
    this.startDate.valueChanges.subscribe(() => {
      this.filterCharts();
    });
    this.endDate.valueChanges.subscribe(() => {
      this.filterCharts();
    });
  }

  filterData(axis: Axis) {
    return this.checkStartDate(axis.date) && this.checkEndDate(axis.date);
  }

  checkStartDate(date: Date) {
    return !this.startDate?.value || (this.startDate?.value && date >= this.startDate?.value);
  }

  checkEndDate(date: Date) {
    return !this.endDate?.value || (this.endDate?.value && date <= this.endDate?.value);
  }

  filterCharts() {
    this.chartService.getChartData().pipe(
      map(entities => entities.map(item => {
        const data = item?.data ? item.data
          .filter(this.filterData.bind(this))
          .map(val => ({x: val.date, y: val.value})) : [];
        return {
          colors: [item.color],
          chart: {
            type: item.type,
          },
          title: {
            text: item.name,
          },
          credits: {
            enabled: false,
          },
          xAxis: {
            type: 'datetime',
          },
          series: [
            {
              name: 'Value',
              data,
            },
          ],
        }
      }))).subscribe(data => {
      this.charts = data;
    });
  }

  ngOnInit(): void {
    this.filterCharts();
  }
}
