import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/group2/auth.service';
import { PassJsonService } from '../../../../services/group2/pass-json.service' ;
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-peers-player',
  templateUrl: './peers-player.component.html',
  styleUrls: ['./peers-player.component.css']
})
export class PeersPlayerComponent implements OnInit {

  user: Object;
  peer:Array<Object>;
  progress_With:Array<Object> ;
  progress_Against:Array<Object> ;
  progress_Gpm:Array<Object> ;
  progress_Xpm:Array<Object> ;
  bestWith:number ;
  bestAgainst:number ;
  bestGpm:number ;
  bestXpm:number ;
  subscription: Subscription ;

  constructor(
    private authService: AuthService,
    private passJsonService:PassJsonService
  ) { }

  ngOnInit() {
        this.subscription = this.passJsonService.getPeer$.subscribe(data => {
        this.peer = data ;

        this.bestWith = 0 ;this.bestAgainst = 0 ;this.bestGpm = 0 ;this.bestXpm = 0 ;
        this.progress_With = [] ; this.progress_Against = [] ; this.progress_Gpm = [];
        this.progress_Xpm = [] ;

        for(let i = 0 ; i < this.peer.length  ;i++){
          var percent = this.peer[i]['win'] / this.peer[i]['with_games'] *100 ;
          var percent_against = this.peer[i]['against_win'] / this.peer[i]['against_games'] *100 ;
          var avr_gpm = this.peer[i]['with_gpm_sum'] / this.peer[i]['with_games'] ;
          var avr_xpm = this.peer[i]['with_xpm_sum'] / this.peer[i]['with_games']   ;
          this.peer[i]['win_percentage'] = percent.toFixed(2);
          if( this.peer[i]['against_games'] == 0 )this.peer[i]['win_against_percentage'] = 0 ;
          else this.peer[i]['win_against_percentage'] = percent_against.toFixed(2);
          this.peer[i]['avr_gpm'] = avr_gpm.toFixed(0) ;
          this.peer[i]['avr_xpm'] = avr_xpm.toFixed(0) ;
          if(this.bestWith < this.peer[i]['with_games']){
            this.bestWith = this.peer[i]['with_games'] ;
          }
          if(this.bestAgainst < this.peer[i]['against_games']){
            this.bestAgainst = this.peer[i]['against_games'] ;
          }
          if(this.bestGpm < this.peer[i]['avr_gpm']){
            this.bestGpm = this.peer[i]['avr_gpm'] ;
          }
          if(this.bestXpm < this.peer[i]['avr_xpm']){
            this.bestXpm = this.peer[i]['avr_xpm'] ;
          }
        }
      },
      err => {
        console.log(err);
        return false;
      });
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

  getPercentageWin( win: number) {
      return win + '%';
  }

  getPercent(type , value:number ){
    if(type == "with_games"){
      let game = value * 100 / this.bestWith ;
      return  game + '%' ;
    }else if(type == "against_games"){
      let game = value * 100 / this.bestAgainst ;
      return  game + '%' ;
    }else if(type == "avr_gpm"){
      let game = value * 100 / this.bestGpm ;
      console.log(game)
      return  game + '%' ;
    }else if(type == "avr_xpm"){
      let game = value * 100 / this.bestXpm ;
      return  game + '%' ;
    }
  }

}
