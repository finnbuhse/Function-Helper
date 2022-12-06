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
    // Get underlying chart component.
    var chartElement = document.getElementById("chart");
    this.chart = new Chart(chartElement);
  }

  /* Can be used to find a specific point within one of the graph's datasets.
     -1 is returned if the point is not found, otherwise, it is the index of the point.
  */
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

  /* Can be used to add a point to one of the graph's datasets. 
     The point will not be added if it already exists in the dataset.
     If you require the number of points to be properly represented; consider either adding to the dataset yourself,
     or adding an additional dataset such as 'frequency' to ensure this information is not lost.
  */
  addPoint(datasetIndex, point)
  {
    if(this.findPoint(datasetIndex, point) != -1)
      return;
    this.datasets[datasetIndex].data.push({x: point[0], y: point[1]});
    this.chart.update();
  }
}
