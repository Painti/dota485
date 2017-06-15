import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/group2/auth.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../../services/config.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  msg: String;

  constructor(
    private authService:AuthService,
    private router:Router,
    private config:ConfigService
  ) { }

  ngOnInit() {
    this.authService.authenticateUser().subscribe(data => {
      this.msg = '';
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        window.location.href = '/profile/setting';
      } else {
        this.msg = 'Redirecting to steam';
        window.location.href = 'http://'+this.config.hostname+':'+this.config.port+'/auth/steam';
      }
    });
  }

}
