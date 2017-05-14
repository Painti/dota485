import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommunicateService } from '../../../../../services/group2/communicate.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, OnDestroy {

  constructor(private communicate: CommunicateService) { }

  match: Object;
  subscription: Subscription;
  type:string;
  data:Object;
  options:Object;

  ngOnInit() {
    this.subscription = this.communicate.getMatch$.subscribe(
      match => {
        this.match = match;
      });
    this.type = 'doughnut';
    this.data = {
      labels: ["r1", "r2", "r3", "r4", "r5", "d1", "d2", "d3", "d4", "d5"],
      datasets: [
        {
          label: "Kill Score",
          data: [65, 59, 80, 81, 56, 55, 40, 56, 55, 40],
          backgroundColor: [
            "#2e6ae6","#5de6ad","#ad00ad","#dcd90a","#e66200",
            "#e67ab0","#92a440","#5cc5e0","#00771e","#835603"
          ],
          hoverBackgroundColor: [
            "#173471","#40a179","#560056","#7e7c06","#ef4236",
            "#cb6d9c","#7c8b39","#53aec6","#005b17","#412a00"
          ],
          borderWidth: [1,1,1,1,1,1,1,1,1,1,1],
          borderColor: [
            "#151515","#151515","#151515","#151515","#151515",
            "#151515","#151515","#151515","#151515","#151515"
          ]
        }
      ]
    };
    this.options = {
      responsive: true,
      maintainAspectRatio: false
    };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
