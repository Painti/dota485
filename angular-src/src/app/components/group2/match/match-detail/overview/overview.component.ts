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
  options1: Object;

  ngOnInit() {
    this.subscription = this.communicate.getMatch$.subscribe(
      match => {
        let kills:Array<Number> = [];
        let players_name:Array<string> = [];
        let sumKill:Array<Number> = [0,0];
        let i:any;
        for (i in match['players']) {
          kills.push(match['players'][i]['kills']);
          players_name.push(match['players'][i]['personaname']);
          sumKill[Math.floor(i/5)] += match['players'][i]['kills'];
        }
        this.data['datasets'][0].data = kills;
        this.data.labels = players_name;
        this.data1['datasets'][0].data = sumKill;
        this.match = match;
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
          text: 'Player Kill Score',
          fontSize: 36,
          fontColor: "#afafaf"
        }
      };

      this.type1 = 'pie';
      this.data1 = {
        labels: ["Radiant", "Dire"],
        datasets: [
          {
            label: "All Kill",
            data: [10, 50],
            backgroundColor: [
              "#40ff40",
              "#ff4040"
            ],
            hoverBackgroundColor: [
              "#40cc40",
              "#cc4040"
            ],
            borderWidth: [1, 1],
            borderColor: [
              "#151515",
              "#151515"
            ]
          }
        ]
      };
      this.options1 = {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Team Kill Score',
          fontSize: 36,
          fontColor: "#afafaf"
        }
      };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
