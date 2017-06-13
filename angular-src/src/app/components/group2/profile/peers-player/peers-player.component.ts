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
  subscription: Subscription ;

  constructor(
    private authService: AuthService,
    private passJsonService:PassJsonService
  ) { }

  ngOnInit() {
        this.subscription = this.passJsonService.getPeer$.subscribe(data => {
        this.peer = data ;
        for(let i = 0 ; i < data.length  ;i++){
          var percent = data[i]['win'] / data[i]['with_games'] *100 ;
          var percent_against = data[i]['against_win'] / data[i]['against_games'] *100 ;
          var avr_gpm = data[i]['with_gpm_sum'] / data[i]['with_games'] ;
          var avr_xpm = data[i]['with_xpm_sum'] / data[i]['with_games']   ;
          this.peer[i]['win_percentage'] = percent.toFixed(2);
          if( data[i]['against_games'] == 0 )this.peer[i]['win_against_percentage'] = 0 ;
          else this.peer[i]['win_against_percentage'] = percent_against.toFixed(2);
          this.peer[i]['avr_gpm'] = avr_gpm.toFixed(0) ;
          this.peer[i]['avr_xpm'] = avr_xpm.toFixed(0) ;
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

}
