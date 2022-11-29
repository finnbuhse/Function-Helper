import { Component, Input, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'graph',
  template: `
  <div style="width: 50%;">
    <canvas baseChart id="chart"
      [chartType]="'line'"
      [legend]="false"
      [datasets]="datasets"
      [labels]="labels"
      [options]="chartOptions">
    </canvas>
    `,
    styleUrls: ['./appStyle.css']
})
export class GraphComponent  {
  @ViewChild(Chart) chart: Chart;

  datasets = [];
  labels = [];
  chartOptions = {
    responsive: true,
    interaction: {
      // Overrides the global setting
      mode: 'index'
    },
    indexAxis: 'x',
    xAxisID: 0,
    yAxisID: 0
  };

  addPoint(point)
  {
    this.labels.push(point[0]);
    this.datasets[0].data.push(point[1]);
    this.chart.update();
  }
}
