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
