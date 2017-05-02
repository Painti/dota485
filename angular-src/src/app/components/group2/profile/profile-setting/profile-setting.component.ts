import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from '../../../../services/group2/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.css']
})
export class ProfileSettingComponent implements OnInit {
  user : Object;

  constructor(
    private http: Http,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      this.user = data.user;
      this.authService.linkFacebook().subscribe();
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onClickLink(){
    window.location.href = "http://localhost:3000/auth/facebook";
  }

}
