import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js';

@Component({
  selector: 'graph',
  template: `
    <div style="width: 50%;">
      <canvas id="chart">{{ chart }}</canvas>
    </div>
    `,
  styleUrls: ['../../../styles.css']
})
export class GraphComponent implements OnInit {
  chart: any;

  ngOnInit()
  {
    // Get underlying chart component.
    this.chart = new Chart("chart", {
      type: 'line' as ChartType,

      data: {
        labels: [], 
	      datasets: []
      },

      options: {
        responsive: true,
        scales: {
          xAxes: [{
            title: 'x',
            id: 'xAxis1',
            type: 'linear',
            position: 'bottom',
            grid:
            {
              borderColor: 'red'
            }
          }],
          yAxes: [{
            title: 'y',
            id: 'yAxis1',
            type: 'linear',
            position: 'left',
            grid:
            {
              borderColor: "blue"
            }
          }]
        }
      }
    });
  }

  setDatasets(datasets)
  {
    this.chart.data.datasets = datasets;
  }

  setLabels(labels)
  {
    this.chart.data.labels = labels;
  }

  /* Can be used to find a specific point within one of the graph's datasets.
     -1 is returned if the point is not found, otherwise, it is the index of the point.
  */
  findPoint(datasetIndex, point)
  {
    for (var i = 0; i < this.chart.data.datasets[datasetIndex].data.length; i++)
    {
      var datasetPoint = this.chart.data.datasets[datasetIndex].data[i];
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
    this.chart.data.datasets[datasetIndex].data.push({x: point[0], y: point[1]});
    this.chart.update();
  }
}