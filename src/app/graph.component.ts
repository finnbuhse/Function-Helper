import { Component, Input, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'graph',
  template: `
  <div style="width: 50%;">
    <canvas baseChart id="chart"
      [chartType]="'line'"
      [legend]="true"
      [datasets]="datasets"
      [labels]="labels"
      [options]="chartOptions">
    </canvas>
    `,
    styleUrls: ['./appStyle.css']
})
export class GraphComponent  {
  datasets = [];
  labels = [];
  chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: 'x',
        type: 'linear',
        grid: {
          borderColor: 'red'
        }
      },
      y: {
        title: 'y',
        type: 'linear',
        grid: {
          borderColor: 'red'
        }
      }
    }
  };

  addPoint(point)
  {
    this.labels.push(point[0]);
    this.datasets[0].data.push(point[1]);
  }
}
