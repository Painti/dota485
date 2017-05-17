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
  user : Object ;
  hero : Array<Object> ;
  match : Array<Object> ;
  score :  Array<Object> ;
  peer :  Array<Object> ;

  constructor(
    private authService:AuthService,
    private router:Router,
    private getApiService: GetApiService
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      this.user = data.user;
    },
    err => {
      console.log(err);
      return false;
    });

    this.authService.getHero().subscribe(data => {
      this.hero = data ;
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

    this.authService.getWinAndLose().subscribe(data => {
      this.score = data ;
    },
    err => {
      console.log(err);
      return false;
    });

    this.authService.getPeer().subscribe(data => {
      this.peer = data ;
    },
    err => {
      console.log(err);
      return false;
    });

  }

}
