import { Component, Input, ViewChild, OnInit } from '@angular/core';
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
export class GraphComponent implements OnInit {
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
        }//,
        //axis: 'x',
        //position: 'bottom'
      },
      y: {
        title: 'y',
        type: 'linear',
        grid: {
          borderColor: 'red'
        }//,
        //axis: 'y',
        //position: 'left'
      }
    }
  };
  chart: Chart;

  ngOnInit()
  {
    var chartElement = document.getElementById("chart");
    this.chart = new Chart(chartElement);
  }

  addPoint(point)
  {
    this.datasets[1].data.push({x: point[0], y: point[1]});
    this.chart.update();
  }
}
