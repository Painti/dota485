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
  hero1: Array<Object>;

  constructor(private passJsonService:PassJsonService) {}



  ngOnInit() {
    this.subscription = this.passJsonService.getHeroes$.subscribe(data => {
    this.hero = data ;
    this.hero1= [];
    let total_game = 0;
    let total_with_game = 0;
    let total_against_game = 0;

    for(let j = 0;j < data.length; j++){
      //if(this.data[j]['last_played'] )
        this.hero1.push(data[j]);
        if(total_game < data[j]['games']){
          total_game = data[j]['games'] ;
        }
        var win_rate_hero = data[j]['win'] / data[j]['games'] *100 ;
      if( data[j]['games'] == 0 ){
          win_rate_hero = 0 ;
        }
        this.hero1[j]['win_rate'] = win_rate_hero.toFixed(2);
    }

    for(let j = 0;j < data.length; j++){
        this.hero1.push(data[j]);
        if(total_with_game < data[j]['with_games']){
          total_with_game = data[j]['with_games'] ;
        }
        var with_win_rate_hero = data[j]['with_win'] / data[j]['with_games'] *100 ;
      if( data[j]['with_games'] == 0 ){
          with_win_rate_hero = 0 ;
        }
        this.hero1[j]['with_win_rate'] = with_win_rate_hero.toFixed(2);
    }

    for(let j = 0;j < data.length; j++){
        this.hero1.push(data[j]);
        if(total_against_game < data[j]['against_games']){
          total_against_game = data[j]['against_games'] ;
        }
        var against_win_rate_hero1 = data[j]['against_win'] / data[j]['against_games'] *100 ;
      if( data[j]['against_games'] == 0 ){
          against_win_rate_hero1 = 0 ;
        }
        this.hero1[j]['against_win_rate'] = against_win_rate_hero1.toFixed(2);
    }

    for(let i = 0;i < data.length; i++){
        let game = data[i]['games'] * 100 / total_game ;
        this.hero1[i]['gamePercentage'] = game ;
    }

    for(let i = 0;i < data.length; i++){
        let with_games = data[i]['with_games'] * 100 / total_with_game ;
        this.hero1[i]['withPercentage'] = with_games ;
    }

    for(let i = 0;i < data.length; i++){
        let against = data[i]['against_games'] * 100 / total_against_game ;
        this.hero1[i]['againstPercentage'] = against ;
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

  getBgColor(value){
    if(value < 35){
      return "bg-danger" ;
    }else if(value >= 35 && value <= 70){
      return "bg-warning" ;
    }else{
      return "bg-success" ;
    }
  }

  getValueWithPercentage(value){
    return value + '%' ;
  }


}
