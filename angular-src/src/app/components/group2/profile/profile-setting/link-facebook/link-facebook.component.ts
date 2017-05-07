import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/group2/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-link-facebook',
  templateUrl: './link-facebook.component.html',
  styleUrls: ['./link-facebook.component.css']
})
export class LinkFacebookComponent implements OnInit {

  constructor(
      private authService:AuthService,
      private router:Router
  ) { }

  ngOnInit() {
      this.authService.linkFacebook().subscribe(data => {
        if(data.success){
          this.router.navigate(['profile/setting', { linked: 'true' }]);
        }
      });
  }

}
