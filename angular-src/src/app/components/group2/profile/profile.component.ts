import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/group2/auth.service';
import { GetApiService } from '../../../services/get-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;
  hero: Array<Object>;
  match: Array<Object>;
  score: Object;
  peer: Array<Object>;
  player: Array<Object>;
  win_rate: Object;

  constructor(
    private authService: AuthService,
    private router: Router,
    private getApiService: GetApiService
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

}
