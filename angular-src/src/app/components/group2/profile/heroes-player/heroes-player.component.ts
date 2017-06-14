import { Component, OnInit } from '@angular/core';
import { PassJsonService } from '../../../../services/group2/pass-json.service' ;
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-heroes-player',
  templateUrl: './heroes-player.component.html',
  styleUrls: ['./heroes-player.component.css']
})
export class HeroesPlayerComponent implements OnInit {

  subscription: Subscription ;
  hero: Array<Object>;

  constructor(private passJsonService:PassJsonService) {}

  ngOnInit() {
    this.subscription = this.passJsonService.getHeroes$.subscribe(data => {
    this.hero = data ;
    for(let i = 0 ; i < data.length  ;i++){
      var win_rate = data[i]['win'] / data[i]['games'] *100 ;
      var with_win_rate = data[i]['with_win'] / data[i]['with_games'] *100 ;
      var against_win_rate = data[i]['against_win'] / data[i]['against_games'] *100 ;
      if( data[i]['against_games'] == 0 ){
        against_win_rate = 0 ;
      } else if( data[i]['with_games'] == 0 ){
        with_win_rate = 0 ;
      } else if( data[i]['games'] == 0 ){
        win_rate = 0 ;
      }
      this.hero[i]['win_rate'] = win_rate.toFixed(2);
      this.hero[i]['with_win_rate'] = with_win_rate.toFixed(2);
      this.hero[i]['against_win_rate'] = against_win_rate.toFixed(2);
    }
  },
  err => {
    console.log(err);
    return false;
  });
  }

  getImage(name){
    return "https://api.opendota.com/apps/dota2/images/heroes/"+name+"_sb.png" ;
  }

  getName(name){
    name = name.replace('_',' ') ;
    return name.charAt(0).toUpperCase()+name.slice(1);
  }

  getTimeAgo(previous: number) {
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let current = Date.now();
    let elapsed = current - previous * 1000;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + ' months ago';
    } else {
      return Math.round(elapsed / msPerYear) + ' years ago';
    }
  }


}
