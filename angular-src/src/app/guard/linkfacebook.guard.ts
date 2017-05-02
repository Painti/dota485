import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/group2/auth.service';

@Injectable()
export class LinkFacebookGuard implements CanActivate{

  constructor(
    private authService:AuthService,
    private router:Router
  ){ }

  canActivate(){
    if(this.authService.isLinkedFacebook()){
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
