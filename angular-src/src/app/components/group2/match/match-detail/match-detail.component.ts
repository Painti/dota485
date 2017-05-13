import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../../services/get-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit {

  constructor(
    private api: GetApiService,
    private route: ActivatedRoute
  ) { }

  match:Object;
  id:string;
  state:any;

  ngOnInit() {
    this.state = {o: {state: 'failed'}};
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
      });
    }
    return obj['progress'];
  }

}
