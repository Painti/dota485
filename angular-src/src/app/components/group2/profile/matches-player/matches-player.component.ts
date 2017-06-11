import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/group2/auth.service';

@Component({
  selector: 'app-matches-player',
  templateUrl: './matches-player.component.html',
  styleUrls: ['./matches-player.component.css']
})
export class MatchesPlayerComponent implements OnInit {
  user: Object;
  hero: Array<Object>;
  match: Array<Object>;
  score: Object;
  peer: Array<Object>;
  player: Array<Object>;
  hero_name:Array<Object>;
  hero_stat:Array<any> ;
  heroes_img: Array<Object> ;
  wl_recentMatch: Array<String> ;
  win_rate: Object;
  kills_avr: any;
  deaths_avr: any;
  assists_avr: any;
  gold_avr: any;
  xp_avr: any;
  lh_avr: any;
  damage_avr: any;
  heal_avr: any;
  tw_damage_avr: any;
  duration_avr: any;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      this.user = data.user;
      this.authService.getHero(this.user['account_id']).subscribe(data => {
        this.hero = data;


      },
        err => {
          console.log(err);
          return false;
        });

        this.authService.getProfile_Player(this.user['account_id']).subscribe(data => {
          this.player = data ;

        },
        err => {
          console.log(err);
          return false;
        });

        this.authService.getHero_Stats().subscribe(data => {
          this.hero_stat = data ;

        },
        err => {
          console.log(err);
          return false;
        });

      this.authService.getRecentMatch(this.user['account_id']).subscribe(data => {
        this.match = data ;
        this.kills_avr = 0 ; this.deaths_avr = 0 ;this.assists_avr = 0 ;
        this.gold_avr = 0;this.xp_avr = 0 ; this.lh_avr = 0;
        this.damage_avr = 0 ; this.heal_avr = 0;this.tw_damage_avr = 0 ;

        this.wl_recentMatch = [] ;
        this.hero_name = [] ;

        for(let i = 0 ; i < data.length  ;i++){
          this.kills_avr =  this.kills_avr + this.match[i]['kills'] ;
          this.deaths_avr += this.match[i]['deaths'] ;
          this.assists_avr += this.match[i]['assists'] ;
          this.gold_avr += this.match[i]['gold_per_min'] ;
          this.xp_avr += this.match[i]['xp_per_min'] ;
          this.lh_avr += this.match[i]['last_hits'] ;
          this.damage_avr += this.match[i]['hero_damage'] ;
          this.heal_avr += this.match[i]['hero_healing'] ;
          this.tw_damage_avr += this.match[i]['tower_damage'] ;
          if(this.match[i]['player_slot'] < 5 && this.match[i]['radiant_win'] == false ||
            this.match[i]['player_slot'] > 5 && this.match[i]['radiant_win'] == true){
            this.wl_recentMatch.push("lose") ;
          }else this.wl_recentMatch.push("Win")  ;
          this.match[i]['cut_name'] = this.match[i]['heroes_name'].replace('_',' ') ;
          if(this.match[i]['player_slot'] <= 5){
            this.match[i]['player_team'] = "Radiant" ;
          }else this.match[i]['player_team'] = "Dire" ;

          this.hero_name[i] = this.match[i]['heroes_name'].charAt(0).toUpperCase() + this.match[i]['heroes_name'].slice(1).replace('_',' ') ;
        }
        this.kills_avr /= data.length;
        this.deaths_avr /= data.length ;
        this.assists_avr /= data.length ;
        this.gold_avr /= data.length ;
        this.xp_avr /= data.length ;
        this.lh_avr /= data.length ;
        this.damage_avr /= data.length ;
        this.heal_avr /= data.length ;
        this.tw_damage_avr /= data.length ;

        this.kills_avr = this.kills_avr.toFixed(0) ;
        this.deaths_avr = this.deaths_avr.toFixed(0) ;
        this.assists_avr = this.assists_avr.toFixed(0) ;
        this.gold_avr = this.gold_avr.toFixed(0) ;
        this.xp_avr = this.xp_avr.toFixed(0) ;
        this.lh_avr = this.lh_avr.toFixed(0) ;
        this.damage_avr = this.damage_avr.toFixed(0) ;
        this.heal_avr = this.heal_avr.toFixed(0) ;
        this.tw_damage_avr = this.tw_damage_avr.toFixed(0) ;


      },
      err => {
        console.log(err);
        return false;
      });

      this.authService.getWinAndLose(this.user['account_id']).subscribe(data => {
        this.score = data ;
        this.win_rate = (this.score['win'] / (this.score['win'] + this.score['lose'])) * 100 ;
        var st_win_rate = JSON.stringify(this.win_rate);
        this.win_rate = parseFloat(st_win_rate).toFixed(1) ;
      },
      err => {
        console.log(err);
        return false;
      });

      this.authService.getPeer(this.user['account_id']).subscribe(data => {
        this.peer = data ;
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

  getColor(color){
    if(color == "Win"){
      return "green" ;
    }else{
      return "red" ;
    }
  }

  getImage(name){
    return "https://api.opendota.com/apps/dota2/images/heroes/"+name+"_sb.png" ;
  }

  getName(name){
    name = name.replace('_',' ') ;
    return name.charAt(0).toUpperCase()+name.slice(1);
  }

}
