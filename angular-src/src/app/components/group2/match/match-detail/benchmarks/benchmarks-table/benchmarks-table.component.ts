import { Component, OnInit, Input } from '@angular/core';
import { GetApiService } from '../../../../../../services/get-api.service';

@Component({
  selector: 'app-benchmarks-table',
  templateUrl: './benchmarks-table.component.html',
  styleUrls: ['./benchmarks-table.component.css']
})
export class BenchmarksTableComponent implements OnInit {
  @Input() match: any;
  @Input() name: string;
  @Input() size: Array<number>;

  constructor(private api: GetApiService) { }

  percentile:Array<any>;

  ngOnInit() {
    this.percentile = []
    for (let i of this.size) {
      this.match.players[i]['gold_per_min'] = this.match.players[i]['gold_per_min'] || 0;
      this.match.players[i]['kills_per_min'] = this.match.players[i]['kills_per_min'] || 0;
      this.match.players[i]['last_hits_per_min'] = this.match.players[i].last_hits/(this.match.duration/60);
      this.match.players[i]['hero_damage_per_min'] = this.match.players[i].hero_damage/(this.match.duration/60);
      this.match.players[i]['hero_healing_per_min'] = this.match.players[i].hero_healing/(this.match.duration/60);
      let per = {
        gold_per_min: null,
        hero_damage_per_min: null,
        hero_healing_per_min: null,
        kills_per_min: null,
        last_hits_per_min: null,
        tower_damage: null,
        xp_per_min: null
      };
      this.percentile.push(per);
    }
    for(let i=0; i<this.size.length; i++){
      this.api.getOpendataBenchmarks(this.match.players[this.size[i]].hero_id).subscribe(data => {
        for (let key in data.result) {
          let b = true;
          for (let j = data.result[key].length-1; j >= 0 ; j--) {
            if(data.result[key][j].value < this.match.players[this.size[i]][key]){
              this.percentile[i][key] = data.result[key][j].percentile*100;
              b = false
              break;
            }
          }
          if(b){
            this.percentile[i][key] = 0;
          }
        }
      },
        err => {
          console.log(err);
          return false;
        });
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

  checkPercentile(percentile){
    for (let item of this.percentile) {
      for (let key in item) {
        if(item[key] == null){
          return false;
        }
      }
    }
    return true;
  }

}
