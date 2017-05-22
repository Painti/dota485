import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../../services/get-api.service';
import { CommunicateService } from '../../../../services/group2/communicate.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit{

  constructor(
    private api: GetApiService,
    private route: ActivatedRoute,
    private communicate: CommunicateService
  ) {}

  match:Object;
  id:string;
  state:any;
  player_size:Array<Number>;

  ngOnInit() {
    this.state = {o: {state: 'failed'}};
    this.player_size = [0,1,2,3,4];
    this.route.params.subscribe(params => {
      this.id = params['match_id'];
      // this.api.postRequestMatch(this.id).subscribe(data => {
      //   let job_id = null;
      //   if(data.err == null){
      //     job_id = data.job.jobId;
      //     this.api.getRequestMatch(job_id, this.state).subscribe(data1 => {
      //       this.state.o = data1;
      //     });
      //   }
      // },
      // err => {
      //   console.log(err);
      //   return false;
      // });
    });
  }

  getProgress(obj: Object){
    if(obj['state'] == 'failed' || obj['state'] == 'completed'){
      obj['progress'] = 100;
      obj['state'] = '1';
      this.api.getOpendata('/matches/'+this.id).subscribe(data => {
        this.match = data;
        let i:any;
        this.match['team_score_kills'] = [0,0];
        let sumKill = [0,0];
        let x:number = 0;
        let sumMMR:number = 0;
        for (i in this.match['players']) {
          this.match['team_score_kills'][Math.floor(i/5)] += this.match['players'][i]['kills'];
          if(this.match['players'][i]['solo_competitive_rank'] != null){
            sumMMR += parseInt(this.match['players'][i]['solo_competitive_rank']);
            x += 1;
          }
        }
        this.match['avg_mmr'] = Math.round(sumMMR/x);

        this.communicate.emitMatch(this.match);
      });
    }
    return obj['progress'];
  }

  emit(){
    this.communicate.emitMatch(this.match);
  }

  getTeamName(name:any){
    if(!name){
      return '(anonymous)';
    }
    return name;
  }

  getImageHero(name){
    return 'http://cdn.dota2.com/apps/dota2/images/heroes/'+name+'_sb.png';
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
