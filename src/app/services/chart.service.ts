import {Injectable, signal, WritableSignal} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ChartEntity} from "../models/chart-entity.model";
import {generateRandomData} from "../helpers/number-helpers";

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  charts: WritableSignal<ChartEntity[]> = signal([]);
  autoIncrementNum = 1;

  getChartData(): Observable<ChartEntity[]> {
    return of(this.charts());
  }

  add(entity: ChartEntity) {
    return this.charts.update(charts => {
      entity.id = this.autoIncrementNum;
      entity.data = generateRandomData();
      charts.push(entity);
      this.autoIncrementNum++;
      return charts;
    });
  }

  edit(entity: ChartEntity) {
    return this.charts.update(charts => {
      const chart = charts.find(chart => chart.id === entity.id);
      if (chart) {
        chart.name = entity.name;
        chart.type = entity.type;
        chart.color = entity.color;
      }
      return charts;
    });
  }

  delete(id: number) {
    return this.charts.update(charts => {
      return charts.filter(chart => chart.id !== id);
    });
  }

}
