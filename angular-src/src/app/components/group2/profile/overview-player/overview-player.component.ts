import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/group2/auth.service';

@Component({
  selector: 'app-overview-player',
  templateUrl: './overview-player.component.html',
  styleUrls: ['./overview-player.component.css']
})
export class OverviewPlayerComponent implements OnInit {

  user: Object;
  hero: Array<Object>;
  match: Array<Object>;
  score: Object;
  peer: Array<Object>;
  player: Array<Object>;
  hero_name:Array<Object>;
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
  best_kill:any ;
  best_kill_id:any ;
  best_deaths:any ;
  best_deaths_id:any ;
  best_assits:any ;
  best_assits_id:any ;
  best_gpm:any ;
  best_gpm_id:any ;
  best_xpm:any ;
  best_xpm_id:any ;
  best_lh:any ;
  best_lh_id:any ;
  best_damage:any ;
  best_damage_id:any ;
  best_heal:any ;
  best_heal_id:any ;
  best_tw_damage:any ;
  best_tw_damage_id:any ;

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

      this.authService.getRecentMatch(this.user['account_id']).subscribe(data => {
        this.match = data ;
        this.kills_avr = 0 ; this.deaths_avr = 0 ;this.assists_avr = 0 ;
        this.gold_avr = 0;this.xp_avr = 0 ; this.lh_avr = 0;
        this.damage_avr = 0 ; this.heal_avr = 0;this.tw_damage_avr = 0 ;
        this.best_kill = 0 ;this.best_deaths = 0 ;this.best_assits = 0 ;
        this.best_gpm = 0 ;this.best_xpm = 0 ;this.best_lh = 0 ;
        this.best_damage = 0 ;this.best_heal = 0 ;this.best_tw_damage = 0 ;

        this.wl_recentMatch = [] ;
        this.hero_name = [] ;
        var win = 0 ;var tw_damage = 0;var heal = 0;var damage = 0 ;

        for(let i = 0 ; i < data.length  ;i++){
          this.kills_avr += this.match[i]['kills'] ;
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
          }else {this.wl_recentMatch.push("Win"); win++ ;}
          this.match[i]['cut_name'] = this.match[i]['heroes_name'].replace('_',' ') ;
          if(this.match[i]['player_slot'] <= 5){
            this.match[i]['player_team'] = "Radiant" ;
          }else this.match[i]['player_team'] = "Dire" ;
          this.hero_name[i] = this.match[i]['heroes_name'].charAt(0).toUpperCase() + this.match[i]['heroes_name'].slice(1).replace('_',' ') ;
          if(this.best_kill < this.match[i]['kills']){
            this.best_kill = this.match[i]['kills'] ;
            this.best_kill_id = i ;
          }
          if(this.best_deaths < this.match[i]['deaths']){
            this.best_deaths = this.match[i]['deaths'] ;
            this.best_deaths_id = i ;
          }
          if(this.best_assits < this.match[i]['assists']){
            this.best_assits = this.match[i]['assists'] ;
            this.best_assits_id = i ;
          }
          if(this.best_gpm < this.match[i]['gold_per_min']){
            this.best_gpm = this.match[i]['gold_per_min'] ;
            this.best_gpm_id = i ;
          }
          if(this.best_xpm < this.match[i]['xp_per_min']){
            this.best_xpm = this.match[i]['xp_per_min'] ;
            this.best_xpm_id = i ;
          }
          if(this.best_lh < this.match[i]['last_hits']){
            this.best_lh = this.match[i]['last_hits'] ;
            this.best_lh_id = i ;
          }
          if(damage < this.match[i]['hero_damage']){
            damage = this.match[i]['hero_damage'] ;
            this.best_damage_id = i ;
          }
          if(heal < this.match[i]['hero_healing']){
            heal = this.match[i]['hero_healing'] ;
            this.best_heal_id = i ;
          }
          if(tw_damage < this.match[i]['tower_damage']){
            tw_damage = this.match[i]['tower_damage']
            this.best_tw_damage_id = i ;
          }
        }
        win = win / 20 * 100;
        this.kills_avr /= data.length;
        this.deaths_avr /= data.length ;
        this.assists_avr /= data.length ;
        this.gold_avr /= data.length ;
        this.xp_avr /= data.length ;
        this.lh_avr /= data.length ;
        this.heal_avr /= data.length ;

        if(this.damage_avr >= 1000){
          this.damage_avr /= data.length * 1000 ;
          this.damage_avr = this.damage_avr.toFixed(1) ;
          this.damage_avr = this.damage_avr + "K" ;
        }
        else{
          this.damage_avr /= data.length ;
          this.damage_avr = this.damage_avr.toFixed(0) ;
        }

        if(this.tw_damage_avr >= 1000){
            this.tw_damage_avr /= data.length * 1000 ;
            this.tw_damage_avr = this.tw_damage_avr.toFixed(1) ;
            this.tw_damage_avr = this.tw_damage_avr + "K" ;
        }
        else {
          this.tw_damage_avr /= data.length ;
          this.tw_damage_avr = this.damage_avr.toFixed(0) ;
        }

        if(heal > 1000){
          heal = heal /1000;
          this.best_heal = heal.toFixed(1) +"K";
        }else this.best_heal = heal ;

        if(damage > 1000){
          damage = damage /1000;
          this.best_damage = damage.toFixed(1) +"K";
        }else this.best_damage = damage ;

        if(tw_damage > 1000){
          tw_damage = tw_damage /1000;
          this.best_tw_damage = tw_damage.toFixed(1) +"K";
        }else this.best_tw_damage = tw_damage ;


        if(data.length == 0){
          this.kills_avr = 0 ;
          this.deaths_avr = 0 ;
          this.assists_avr = 0 ;
          this.gold_avr = 0 ;
          this.xp_avr = 0 ;
          this.lh_avr = 0 ;
          this.damage_avr = 0 ;
          this.heal_avr = 0 ;
          this.tw_damage_avr = 0 ;
          this.win_rate = 0 ;
        }else{
          this.kills_avr = this.kills_avr.toFixed(0) ;
          this.deaths_avr = this.deaths_avr.toFixed(0) ;
          this.assists_avr = this.assists_avr.toFixed(0) ;
          this.gold_avr = this.gold_avr.toFixed(0) ;
          this.xp_avr = this.xp_avr.toFixed(0) ;
          this.lh_avr = this.lh_avr.toFixed(0) ;
          this.heal_avr = this.heal_avr.toFixed(0) ;
          this.win_rate = win.toFixed(0) ;



        }
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

  getImageIcon(name){
    return "https://api.opendota.com/apps/dota2/images/heroes/"+name+"_icon.png";
  }

  getName(name){
    name = name.replace('_',' ') ;
    return name.charAt(0).toUpperCase()+name.slice(1);
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
