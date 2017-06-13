import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../../../services/group2/auth.service';

@Component({
  selector: 'app-match-detail-nav',
  templateUrl: './match-detail-nav.component.html',
  styleUrls: ['./match-detail-nav.component.css']
})
export class MatchDetailNavComponent implements OnInit {
  @Input() id:string;
  @Input() match:any;
  constructor(private authService:AuthService) { }
  user : Object;
  url:string;
  hide:boolean;

  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      this.hide = true;
      for (let player of this.match.players) {
        if(player['account_id']+'' == data.user.account_id){
          this.hide = false;
          break;
        }
      }
      this.url = 'https://www.opendota.com/matches/'+this.id;
      this.user = data.user;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
