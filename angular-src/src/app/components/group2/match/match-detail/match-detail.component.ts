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
  id: string;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['match_id'];
      this.api.getOpendata('matches/'+this.id).subscribe(data => {
        this.match = data;
      },
      err => {
        console.log(err);
        return false;
      });
    });
  }

}
