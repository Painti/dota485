import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../../services/get-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor(
    private api: GetApiService,
    private route: ActivatedRoute,
  ) { }
  match:Object;
  id:string;
  state:any;

  ngOnInit() {
    this.state = {o: {state: 'failed'}};
    this.route.params.subscribe(params => {
    this.id = params[':hero_name'];

    });
  }
  getProgress(obj: Object){
    if(obj['state'] == 'failed' || obj['state'] == 'completed'){
      obj['progress'] = 100;
      obj['state'] = '1';
      this.api.getOpendata('/hero/'+this.id).subscribe(data => {
        this.match = data;
      });
    }
    return obj['progress'];
  }

}
