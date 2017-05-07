import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/group2/auth.service';

@Injectable()
export class LoginGuard implements CanActivate{

  constructor(
    private authService:AuthService,
    private router:Router
  ){ }

  canActivate(){
    if(this.authService.loggedIn()){
      this.router.navigate(['/'])
      return false;
    } else {
      return true;
    }
  }

}
