import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommunicateService } from '../../../../../services/group2/communicate.service';
import { Subscription }   from 'rxjs/Subscription';
import { ChartComponent } from 'angular2-chartjs/';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, OnDestroy {

  constructor(private communicate: CommunicateService) { }

  match: Object;
  subscription: Subscription;

  type: string;
  type1: string;
  data: any;
  data1: any;
  options: Object;

  ngOnInit() {
    this.subscription = this.communicate.getMatch$.subscribe(
      match => {
        this.match = match;
        let kills:Array<Number> = [];
        for (let key in this.match['players']) {
          kills.push(this.match['players'][key]['kills']);
        }
        this.data['datasets'][0].data = kills;



      });

      this.type = 'doughnut';
      this.data = {
        labels: ["r1", "r2", "r3", "r4", "r5", "d1", "d2", "d3", "d4", "d5"],
        datasets: [
          {
            label: "Player",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: [
              "#2e6ae6", "#5de6ad", "#ad00ad", "#dcd90a", "#e66200",
              "#e67ab0", "#92a440", "#5cc5e0", "#00771e", "#835603"
            ],
            hoverBackgroundColor: [
              "#173471", "#40a179", "#560056", "#7e7c06", "#ef4236",
              "#cb6d9c", "#7c8b39", "#53aec6", "#005b17", "#412a00"
            ],
            borderWidth: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            borderColor: [
              "#151515", "#151515", "#151515", "#151515", "#151515",
              "#151515", "#151515", "#151515", "#151515", "#151515"
            ]
          }
        ]
      };
      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Kill Score',
          fontSize: 36,
          fontColor: "rgb(175, 175, 175)"
        },
        legend: {
          display: true,
          fontColor: "rgb(187, 3, 255)",
          text: "asdasd"
        }
      };

      this.type1 = 'pie';
      this.data1 = {
        labels: ["r", "d"],
        datasets: [
          {
            label: "All Kill",
            data: [10, 50],
            backgroundColor: [
              "#2e6ae6",
              "#e67ab0"
            ],
            hoverBackgroundColor: [
              "#173471",
              "#cb6d9c"
            ],
            borderWidth: [1, 1],
            borderColor: [
              "#151515",
              "#151515"
            ]
          }
        ]
      };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
