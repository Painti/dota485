import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/group2/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  msg: String;

  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    this.authService.authenticateUser().subscribe(data => {
      this.msg = '';
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        window.location.href = '/profile';
      } else {
        this.msg = 'Redirecting to steam';
        window.location.href = 'http://localhost:3000/auth/steam';
      }
    });
  }

}
