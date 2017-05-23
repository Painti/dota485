import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-peers-player',
  templateUrl: './peers-player.component.html',
  styleUrls: ['./peers-player.component.css']
})
export class PeersPlayerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // this.authService.getProfile_Player(this.user['account_id']).subscribe(data => {
    //   this.player = data ;
    //
    // },
    // err => {
    //   console.log(err);
    //   return false;
    // });
  }

}
