import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../../services/get-api.service';
import { CommunicateService } from '../../../../services/group2/communicate.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit {

  constructor(
    private api: GetApiService,
    private route: ActivatedRoute,
    private communicate: CommunicateService,
    private slimLoadingBarService: SlimLoadingBarService
  ) { }
  
  match: Object;
  id: string;
  player_size: Array<Number>;

  ngOnInit() {
    this.slimLoadingBarService.start();
    this.player_size = [0, 1, 2, 3, 4];
    this.route.params.subscribe(params => {
      this.id = params['match_id'];
      this.api.getOpendata('/matches/' + this.id).subscribe(data => {
        this.match = data;
        let i: any;
        this.match['team_gpm'] = [0, 0];
        this.match['team_exp'] = [0, 0];
        let x: number = 0;
        let sumMMR: number = 0;
        for (i in this.match['players']) {
          this.match['team_gpm'][Math.floor(i / 5)] += this.match['players'][i]['gold_per_min'];
          this.match['team_exp'][Math.floor(i / 5)] += this.match['players'][i]['xp_per_min'];
          if (this.match['players'][i]['solo_competitive_rank'] != null) {
            sumMMR += parseInt(this.match['players'][i]['solo_competitive_rank']);
            x += 1;
          }
        }
        this.match['avg_mmr'] = Math.round(sumMMR / x);
        this.communicate.emitMatch(this.match);
        this.slimLoadingBarService.complete();
      });
    });
  }

  emit() {
    this.communicate.emitMatch(this.match);
  }

  getTeamName(name: any) {
    if (!name) {
      return '(anonymous)';
    }
    return name;
  }

  getImageHero(name) {
    return 'http://cdn.dota2.com/apps/dota2/images/heroes/' + name + '_sb.png';
  }

  getBackgroundImage(bool) {
    return "assets/group2/images/background" + bool + ".JPG";
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
