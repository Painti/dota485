import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/group2/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.css']
})
export class ProfileSettingComponent implements OnInit {
  user : Object;
  url : string;

  constructor(
    private authService:AuthService,
    private router:Router,
    private route: ActivatedRoute,
    private flashMessages: FlashMessagesService,
    private slimLoadingBarService: SlimLoadingBarService
  ) { }

  ngOnInit() {
    this.slimLoadingBarService.start();
    this.authService.getProfile().subscribe(data => {
      this.url = 'https://www.opendota.com/'+data.user.account_id;
      this.user = data.user;
      this.route.params.subscribe((params: Params) => {
        if(params['linked'] == 'true'){
          this.flashMessages.show('Linked to facebook!',
            {cssClass: 'alert-success', timeout: 3000}
          );
        }
      });
      this.slimLoadingBarService.complete();
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onClickLink(){
    window.location.href = "http://localhost:3000/auth/facebook";
  }

  gotoSteam(id){
    window.location.href = "http://steamcommunity.com/profiles/"+id;
  }

}
