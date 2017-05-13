import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../services/get-api.service';
import { FilterPipe } from '../../../pipes/filter.pipe'

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  constructor(private api: GetApiService) { }
  pro: Array<Object>;
  high: Array<Object>;
  low: Array<Object>;
  tabs: Array<String>;
  order: Object = { id: String, league: String };
  shift: Boolean;
  arrfilter: Array<String>;

  ngOnInit() {
    this.api.getOpendata('proMatches').subscribe(data => {
      this.pro = data;
    },
      err => {
        console.log(err);
        return false;
      });

    this.api.getOpendata('publicMatches').subscribe(data => {
      this.high = data;
    },
      err => {
        console.log(err);
        return false;
      });

    this.api.getOpendata('publicMatches?low=true').subscribe(data => {
      this.low = data;
    },
      err => {
        console.log(err);
        return false;
      });

    this.tabs = ['active', '', ''];
    this.initOrder();
  } // end init

  initOrder() {
    this.order = {
      'match_id': 'desc',
      'league_name': ''
    };
    this.arrfilter = ['-match_id'];
  }

  switchAsc(prop: string) {
    let x = this.order[prop];
    this.order['match_id'] = '';
    this.order['league_name'] = '';
    if (x == 'asc') {
      this.order[prop] = 'desc';
      this.arrfilter = ['-' + prop];
    } else if (x == 'desc') {
      this.order[prop] = 'asc';
      this.arrfilter = ['+' + prop];
    } else {
      this.order[prop] = 'asc';
      this.arrfilter = ['+' + prop];
    }
  }

  onTab(num) {
    this.tabs = ['', '', ''];
    this.tabs[num] = 'active';
    this.initOrder();
  }

  canShow(arr, num) {
    return arr && this.tabs[num] == 'active';
  }

  getImageHero(hero) {
    return 'http://cdn.dota2.com/apps/dota2/images/heroes/' + hero + '_sb.png';
  }

  getTime(time: number) {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    let sec_str: String;
    if (sec < 10) {
      sec_str = '0' + sec;
    } else {
      sec_str = '' + sec;
    }
    return min + ':' + sec_str;
  }

  getTeamName(name) {
    if (name == null) {
      return '(annonymous)';
    }
    return name;
  }

  getTimeAgo(previous: number) {
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let current = Date.now();
    let elapsed = current - previous * 1000;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + ' months ago';
    } else {
      return Math.round(elapsed / msPerYear) + ' years ago';
    }
  }
}
