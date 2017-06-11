import { Component, OnInit, Input } from '@angular/core';
import { GetApiService } from '../../../../../../services/get-api.service';

@Component({
  selector: 'app-performance-table',
  templateUrl: './performance-table.component.html',
  styleUrls: ['./performance-table.component.css']
})
export class PerformanceTableComponent implements OnInit {
  @Input() match: any;
  @Input() name: string;
  @Input() size: Array<number>;

  constructor() { }

  max_multi: number;
  max_streak: number;
  max_stun: number;
  max_stacked: number;
  max_dead: number;
  max_buyback: number;

  ngOnInit() {
    this.max_multi = 0;
    this.max_streak = 0;
    this.max_stun = 0;
    this.max_stacked = 0;
    this.max_dead = 0;
    this.max_buyback = 0;
    for (let i of this.size) {
      if (this.match['players'][i].multi_kills == null) {
        this.match['players'][i].multi = 0;
      } else if (Object.keys(this.match['players'][i].multi_kills).length === 0) {
        this.match['players'][i].multi = 0;
      } else {
        let x = 0;
        for (let key in this.match['players'][i].multi_kills) {
          let num = parseInt(key);
          if (num > x) {
            x = num;
          }
        }
        this.match['players'][i].multi = x;
      }

      if (this.match['players'][i].kill_streaks == null) {
        this.match['players'][i].streaks = 0;
      } else if (Object.keys(this.match['players'][i].kill_streaks).length === 0) {
        this.match['players'][i].streaks = 0;
      } else {
        let x = 0;
        for (let key in this.match['players'][i].kill_streaks) {
          let num = parseInt(key);
          if (num > x) {
            x = num;
          }
        }
        this.match['players'][i].streaks = x;
      }

      if (this.match['players'][i].multi > this.max_multi)
        this.max_multi = this.match['players'][i].multi;
      if (this.match['players'][i].streaks > this.max_streak)
        this.max_streak = this.match['players'][i].streaks;
      if (this.match['players'][i].stuns > this.max_stun)
        this.max_stun = this.match['players'][i].stuns;
      if (this.match['players'][i].creeps_stacked > this.max_stacked)
        this.max_stacked = this.match['players'][i].creeps_stacked;
      if (this.match['players'][i].life_state_dead > this.max_dead)
        this.max_dead = this.match['players'][i].life_state_dead;
      if (this.match['players'][i].buyback_count > this.max_buyback)
        this.max_buyback = this.match['players'][i].buyback_count;

    }
  }

  getImageHero(name) {
    return 'http://cdn.dota2.com/apps/dota2/images/heroes/' + name + '_sb.png';
  }

  getNameMultiKills(num){
    switch(num){
      case 2: return 'Double kill';
      case 3: return 'Triple kill';
      case 4: return 'Ultra kill';
      case 5: return 'Rampage';
      default: return '-';
    }
  }

  getNameStreakKills(num){
    switch(num){
      case 3: return 'Killing Spree ('+num+'kills)';
      case 4: return 'Dominating ('+num+'kills)';
      case 5: return 'Mega Kill ('+num+'kills)';
      case 6: return 'Unstoppable ('+num+'kills)';
      case 7: return 'Wicked Sick ('+num+'kills)';
      case 8: return 'Monster kill ('+num+'kills)';
      case 9: return 'Godlike ('+num+'kills)';
    }
    if(num >= 10){
      return 'Beyond Godlike ( '+num+'kills )';
    } else {
      return '-';
    }
  }

  getTime(time: number) {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    let sec_str: String;
    if (sec < 10) {
      sec_str = '0' + sec;
    } else {
      sec_str = '' + sec;
    }
    return min + ':' + sec_str;
  }

  getLane(num) {
    switch (num) {
      case 1: return 'Safe';
      case 2: return 'Mid';
      case 3: return 'Off';
      default: return '(Unknown)';
    }
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
