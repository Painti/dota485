import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/group2/auth.service';
import { PassJsonService } from '../../../services/group2/pass-json.service' ;
import { GetApiService } from '../../../services/get-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  hero: Array<Object>;
  match: Array<Object>;
  score: Object;
  total: Array<Object>;
  peer: Array<Object>;
  player: Array<Object>;
  wl_recentMatch: Array<String> ;
  win_rate: Object;
  id:any ;


  constructor(
    private authService: AuthService,
    private router: Router,
    private getApiService: GetApiService,
    private route: ActivatedRoute,
    private passJsonService:PassJsonService,
    private slimLoadingBarService: SlimLoadingBarService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'] ;
      this.authService.getHero(params['id']).subscribe(data => {
        this.hero = data;
        this.passJsonService.emitHeroes(this.hero) ;
        this.slimLoadingBarService.complete();
      },
        err => {
          console.log(err);
          return false;
        });

        this.authService.getProfile_Player(params['id']).subscribe(data => {
          this.player = data ;
          this.passJsonService.emitPlayer(this.player) ;
          this.slimLoadingBarService.complete();
        },
        err => {
          console.log(err);
          return false;
        });


      this.authService.getRecentMatch(params['id']).subscribe(data => {
        this.passJsonService.emitRecentMatch(data) ;
        if(data.length != 0){
          this.match = data ;
          this.wl_recentMatch = [] ;
            for(let i = 0 ; i < data.length  ;i++){
              if(this.match[i]['player_slot'] < 5 && this.match[i]['radiant_win'] == false ||
                this.match[i]['player_slot'] > 5 && this.match[i]['radiant_win'] == true){
                this.wl_recentMatch.push("Lose") ;
              }else this.wl_recentMatch.push("Win")  ;
              this.match[i]['cut_name'] = this.match[i]['heroes_name'].replace('_',' ') ;
              if(this.match[i]['player_slot'] <= 5){
                this.match[i]['player_team'] = "Radiant" ;
              }else this.match[i]['player_team'] = "Dire" ;
          }
        }
        this.slimLoadingBarService.complete();
      },
      err => {
        console.log(err);
        return false;
      });

      this.authService.getWinAndLose(params['id']).subscribe(data => {
        this.score = data ;
        this.passJsonService.emitWl(this.score) ;
        if(this.score['win'] != 0){
          this.win_rate = (this.score['win'] / (this.score['win'] + this.score['lose'])) * 100 ;
          var st_win_rate = JSON.stringify(this.win_rate);
          this.win_rate = parseFloat(st_win_rate).toFixed(1) ;
        }else{
          this.win_rate = 0 ;
        }
        this.slimLoadingBarService.complete();
      },
      err => {
        console.log(err);
        return false;
      });

      this.authService.getPeer(params['id']).subscribe(data => {
        this.peer = data ;
        this.passJsonService.emitPeer(this.peer) ;
        this.slimLoadingBarService.complete();
      },
      err => {
        console.log(err);
        return false;
      });
      this.authService.getTotals(params['id']).subscribe(data =>{
        this.total = data ;
        this.passJsonService.emitTotal(this.total) ;
      },
      err => {
        console.log(err);
        return false;
      });
    });


  }

  emit(){
    this.passJsonService.emitWl(this.score) ;
    this.passJsonService.emitPeer(this.peer) ;
    this.passJsonService.emitRecentMatch(this.match) ;
    this.passJsonService.emitPlayer(this.player) ;
    this.passJsonService.emitHeroes(this.hero) ;
    this.passJsonService.emitTotal(this.total) ;
  }

}
