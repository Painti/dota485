import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-player',
  templateUrl: './navbar-player.component.html',
  styleUrls: ['./navbar-player.component.css']
})
export class NavbarPlayerComponent implements OnInit {
@Input() id:string;
  constructor() { }

  ngOnInit() {
  }

}
