import { Component, AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'graph',
  templateUrl: './graph.component.html',
  styleUrls: []
})
export class GraphComponent implements AfterViewInit {
  static instanceCount = 0;

  idNumber: Number;

  chart: any;

  constructor(private cdr: ChangeDetectorRef)
  {
    this.idNumber = GraphComponent.instanceCount;
    GraphComponent.instanceCount++;
  }

  ngAfterViewInit() // Dynamic id only works after view is initialized
  {
    // Get underlying chart component, dynamic id avoids ambiguity between graphs so each can obtain their respective chart.

    var chartElem = document.getElementById("chart" + this.idNumber);

    if (chartElem != null) {
      var chartHTMLElem = chartElem as HTMLCanvasElement;

      this.chart = new Chart(chartHTMLElem.getContext("2d") as CanvasRenderingContext2D, {
        type: 'line',

        data: {
          labels: [],
          datasets: []
        },

        options: {
          responsive: true,
          scales: {
            xAxis: {
              type: 'linear',
              axis: 'x',
              bounds: 'data',
              beginAtZero: true,

              position:
              {
                yAxis: 0
              },

              border: {
                display: true,
                color: "red"
              },

              title: {
                text: "x",
                color: "red"
              }
            },

            yAxis: {
              type: 'linear',
              axis: 'y',
              bounds: 'data',
              beginAtZero: true,

              position:
              {
                xAxis: 0
              },

              border: {
                display: true,
                color: "blue"
              },

              title: {
                text: "y",
                color: "blue"
              }
            }
          }
        }
      });
    }
    this.cdr.detectChanges(); // Prevent change error from being thrown 
  }

  /* Sets the graphs datasets directly. */
  setDatasets(datasets: Array<any>) {
    this.chart.data.datasets = datasets;
    this.chart.update();
  }

  /* Sets the graphs labels directly. */
  setLabels(labels: Array<any>) {
    this.chart.data.labels = labels;
    this.chart.update();
  }

  /* Can be used to find a specific point within one of the graph's datasets.
     -1 is returned if the point is not found, otherwise, it is the index of the point. */
  findPoint(datasetIndex: number, point: any) {
    for (var i = 0; i < this.chart.data.datasets[datasetIndex].data.length; i++) {
      var datasetPoint = this.chart.data.datasets[datasetIndex].data[i];
      if (point[0] == datasetPoint.x && point[1] == datasetPoint.y) {
        return i;
      }
    }
    return -1;
  }

  /* Can be used to add a point to one of the graph's datasets.
     The point will not be added if it already exists in the dataset.
     If you require the number of points to be properly represented; consider either adding to the dataset yourself,
     or adding an additional dataset such as 'frequency' to ensure this information is not lost. */
  addPoint(datasetIndex: number, point: any) {
    if (this.findPoint(datasetIndex, point) != -1)
      return;
    this.chart.data.datasets[datasetIndex].data.push({ x: point[0], y: point[1] });
    this.chart.update();
  }
}
