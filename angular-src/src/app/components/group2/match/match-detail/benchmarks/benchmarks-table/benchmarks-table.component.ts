import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-benchmarks-table',
  templateUrl: './benchmarks-table.component.html',
  styleUrls: ['./benchmarks-table.component.css']
})
export class BenchmarksTableComponent implements OnInit {
  @Input() match: any;
  @Input() name: string;
  @Input() size: Array<number>;

  constructor() { }

  ngOnInit() {
  }

  getImageHero(name) {
    return 'http://cdn.dota2.com/apps/dota2/images/heroes/' + name + '_sb.png';
  }

  getClass(num){
    num *= 100;
    if(num >= 70){
      return 'bg-success';
    } else if(num >= 40){
      return 'bg-warning';
    } else {
      return 'bg-danger';
    }
  }
}
