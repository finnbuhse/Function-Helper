import { Component, Input } from '@angular/core';

@Component({
  selector: 'graph',
  template: `
  <div style="width: 50%;">
    <canvas baseChart
      [chartType]="'line'"
      [legend]="true"
      [datasets]="datasets"
      [labels]="labels"
      [options]="chartOptions">
    </canvas>
    `
})
export class GraphComponent  {
  datasets = [];
  labels = [];
  chartOptions = {
    responsive: true
  };
}
