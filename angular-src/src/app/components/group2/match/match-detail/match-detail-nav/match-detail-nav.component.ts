import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-match-detail-nav',
  templateUrl: './match-detail-nav.component.html',
  styleUrls: ['./match-detail-nav.component.css']
})
export class MatchDetailNavComponent implements OnInit {
  @Input() id:string;
  constructor() { }

  ngOnInit() {
  }

}
