import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/group2/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  name : String;
  isCollapsed : boolean = true;

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

}
