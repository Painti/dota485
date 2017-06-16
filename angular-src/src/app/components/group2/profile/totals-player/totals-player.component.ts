import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/group2/auth.service';
import { PassJsonService } from '../../../../services/group2/pass-json.service' ;
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-totals-player',
  templateUrl: './totals-player.component.html',
  styleUrls: ['./totals-player.component.css']
})
export class TotalsPlayerComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private passJsonService:PassJsonService
  ) { }

  user:Object ;
  total_kill:any ;
  total_death:any ;
  total_assists:any ;
  total_lh:any ;
  total_denide:any ;
  total_heroDamage:any ;
  total_twDamage:any ;
  total_heroHeal:any ;
  total_lv:any;
  total_gpm:any ;
  total_xpm:any ;
  total_stuns:any ;
  total_twKill:any ;
  total_neKill:any ;
  total_courKill:any ;
  total_tpsPus:any ;
  total_obsePus:any ;
  total_senPus:any ;
  total_gemPus:any ;
  total_rapiersPus:any ;
  total_mapPings:any ;
  subscription: Subscription ;

  ngOnInit() {
    this.subscription = this.passJsonService.getPlayer$.subscribe(player => {
      this.user = player
    },
      err => {
        console.log(err);
        return false;
    });

        this.subscription = this.passJsonService.getTotal$.subscribe(data => {
          this.total_kill = data[0]['sum'] ;
          this.total_death = data[1]['sum'] ;
          this.total_assists = data[2]['sum'] ;
          this.total_gpm = data[4]['sum'] ;
          this.total_xpm = data[5]['sum'] ;
          this.total_lh = data[6]['sum'] ;
          this.total_denide = data[7]['sum'] ;
          this.total_lv = data[10]['sum'] ;
          this.total_heroDamage = data[11]['sum'] ;
          this.total_twDamage = data[12]['sum'] ;
          this.total_heroHeal = data[13]['sum'] ;
          this.total_twKill = data[15]['sum'] ;
          this.total_neKill = data[16]['sum'] ;
          this.total_courKill = data[17]['sum'] ;
          this.total_tpsPus = data[18]['sum'] ;
          this.total_obsePus = data[19]['sum'] ;
          this.total_senPus = data[20]['sum'] ;
          this.total_gemPus = data[21]['sum'] ;
          this.total_rapiersPus = data[22]['sum'] ;
          this.total_mapPings = data[23]['sum'] ;
          if(data[14]['sum'] == 0)this.total_stuns = data[14]['sum']
          else this.total_stuns = data[14]['sum'].toFixed(0) ;
      },
        err => {
          console.log(err);
          return false;
      });

  }

  toLocalNum(num){
    if(num != null)
    return num.toLocaleString() ;
  }

  getValue(num){
    if(num > 1000000){
      num /= 1000000 ;
      return num.toFixed(1) +'M' ;
    }else if(num > 1000){
      num /= 1000 ;
      return num.toFixed(1) +'K';
    }else return num ;
  }

}
