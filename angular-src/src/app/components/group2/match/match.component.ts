import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../services/get-api.service';


@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  constructor(private api:GetApiService) { }
  pro:Array<Object>;
  tabs:Array<String>;

  ngOnInit() {
    this.api.getOpendata('proMatches').subscribe(data => {
      this.pro = data;
    },
    err => {
      console.log(err);
      return false;
    });

    this.tabs = ['active','',''];
  }

  onTab(num){
    this.tabs = ['','',''];
    this.tabs[num] = 'active';
  }

  trackByFn(index, item) {
    return item.id;
  }
}
