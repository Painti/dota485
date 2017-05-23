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
  heros:Object;
  herosDetail:Array<Object>;
  id:string;
  state:any;
  ngOnInit() {
    this.route.params.subscribe(params => {
        this.id = params['hero_name'];
        console.log(params);
        this.api.getHeroes().subscribe(data => {
          this.heros = data[this.id];
        },
          err => {
            console.log(err);
            return false;

          });
    });

  }

  getImage(hName) {
    return "http://cdn.dota2.com/apps/dota2/images/heroes/" + hName + "_lg.png"
  }



}
