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

  getWidthByKDA(type, k:number, d:number, a:number){
    let total:number = k+d+a;
    if(total == 0){
      return '0%';
    }
    k = Math.round(k*100/total);
    d = Math.round(d*100/total);
    a = 100-k-d;
    if(type == 'K'){
      return k+'%';
    } else if(type == 'D'){
      return d+'%';
    } else if(type == 'A'){
      return a+'%';
    }
    return '0%';
  }

}
