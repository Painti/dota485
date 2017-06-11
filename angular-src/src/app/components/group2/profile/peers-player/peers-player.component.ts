import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/group2/auth.service';

@Component({
  selector: 'app-peers-player',
  templateUrl: './peers-player.component.html',
  styleUrls: ['./peers-player.component.css']
})
export class PeersPlayerComponent implements OnInit {

  user: Object;
  peer:Array<Object>;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      this.user = data.user ;

      this.authService.getPeer(this.user['account_id']).subscribe(data => {
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

    },
    err => {
      console.log(err);
      return false;
    });
  }

}
