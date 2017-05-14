import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ChartComponent } from 'angular2-chartjs/';

@Component({
  selector: 'app-overview-chart-kill1',
  templateUrl: './overview-chart-kill1.component.html',
  styleUrls: ['./overview-chart-kill1.component.css']
})
export class OverviewChartKill1Component implements OnInit {
  @Input() kills: Array<Number>;

  constructor() { }

  
  ngOnInit() {

    // this.chartComponent.chart.update();
  }

}
