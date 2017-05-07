import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/group2/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed : boolean = true;
  name : String;

  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      this.name = data.user.displayName;
    },
    err => {
      return false;
    });
  }

  onLogout(){
    this.authService.logout();
    window.location.href = '/';
    return false;
  }

  collapsed(event:any):void {
    console.log(event);
  }

  expanded(event:any):void {
    console.log(event);
  }
}
