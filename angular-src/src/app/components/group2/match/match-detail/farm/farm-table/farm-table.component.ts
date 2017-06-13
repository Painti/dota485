import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-farm-table',
  templateUrl: './farm-table.component.html',
  styleUrls: ['./farm-table.component.css']
})
export class FarmTableComponent implements OnInit {
  @Input() match: any;
  @Input() name: string;
  @Input() size: Array<number>;
  constructor() { }

  max_creeps:number;
  max_neutrals:number;
  max_ancients:number;
  max_towers:number;
  max_couriers:number;
  max_roshan:number;
  max_necro:number;

  ngOnInit() {
    this.max_creeps = 0;
    this.max_neutrals = 0;
    this.max_ancients = 0;
    this.max_towers = 0;
    this.max_couriers = 0;
    this.max_roshan = 0;
    this.max_necro = 0;
    for (let i of this.size) {
      if(this.max_creeps < this.match['players'][i].creep_kills){
        this.max_creeps = this.match['players'][i].creep_kills;
      }
      if(this.max_neutrals < this.match['players'][i].neutral_kills){
        this.max_neutrals = this.match['players'][i].neutral_kills;
      }
      if(this.max_ancients < this.match['players'][i].ancient_kills){
        this.max_ancients = this.match['players'][i].ancient_kills;
      }
      if(this.max_towers < this.match['players'][i].tower_kills){
        this.max_towers = this.match['players'][i].tower_kills;
      }
      if(this.max_couriers < this.match['players'][i].courier_kills){
        this.max_couriers = this.match['players'][i].courier_kills;
      }
      if(this.max_roshan < this.match['players'][i].roshan_kills){
        this.max_roshan = this.match['players'][i].roshan_kills;
      }
      if(this.max_necro < this.match['players'][i].necronomicon_kills){
        this.max_necro = this.match['players'][i].necronomicon_kills;
      }
    }
  }

  getImageHero(name) {
    return 'http://cdn.dota2.com/apps/dota2/images/heroes/' + name + '_sb.png';
  }

  getClass(num){
    if(num >= 70){
      return 'bg-success';
    } else if(num >= 40){
      return 'bg-warning';
    } else {
      return 'bg-danger';
    }
  }
}
