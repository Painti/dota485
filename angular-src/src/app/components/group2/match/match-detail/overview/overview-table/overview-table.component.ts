import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-overview-table',
  templateUrl: './overview-table.component.html',
  styleUrls: ['./overview-table.component.css']
})
export class OverviewTableComponent implements OnInit {
  @Input() match: any;
  @Input() name: string;
  @Input() size: Array<Number>;
  constructor() { }

  ngOnInit() {
  }

  getImageHero(name) {
    return 'http://cdn.dota2.com/apps/dota2/images/heroes/' + name + '_sb.png';
  }

}
