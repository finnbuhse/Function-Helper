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
      xAxes: [{
        title: 'x',
        id: 'xAxis1',
        type: 'linear',
        grid: {
          borderColor: 'red'
        },
        position: 'bottom'
      }],
      yAxes: [{
        title: 'y',
        id: 'yAxis1',
        type: 'linear',
        grid: {
          borderColor: 'red'
        },
        position: 'left'
      }]
    }
  };
  chart: Chart;

  ngOnInit()
  {
    var chartElement = document.getElementById("chart");
    this.chart = new Chart(chartElement);
  }

  findPoint(datasetIndex, point)
  {
    for (var i = 0; i < this.datasets[datasetIndex].data.length; i++)
    {
      var datasetPoint = this.datasets[datasetIndex].data[i];
      if(point[0] == datasetPoint.x && point[1] == datasetPoint.y)
      {
        return i;
      }
    }
    return -1;
  }

  addPoint(datasetIndex, point)
  {
    if(this.findPoint(datasetIndex, point) != -1)
      return;
    this.datasets[datasetIndex].data.push({x: point[0], y: point[1]});
    this.chart.update();
  }
}
