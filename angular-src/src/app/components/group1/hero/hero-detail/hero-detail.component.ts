import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../../services/get-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor(
    private api: GetApiService,
    private route: ActivatedRoute,
    private slimLoadingBarService: SlimLoadingBarService
  ) { }
  heros:Object;
  herosDetail:Array<Object>;
  skills:Array<Object>;
  herosstat:Array<Object>;
  id:string;
  state:any;
  ngOnInit() {
    this.slimLoadingBarService.start();
    this.route.params.subscribe(params => {
        this.id = params['hero_name'];
        this.api.getHeroes().subscribe(data => {
          this.heros = data[this.id];
          this.slimLoadingBarService.complete();

        },
          err => {
            console.log(err);
            return false;

          });
        this.api.getHeroesSkills(this.id).subscribe(data => {
          this.skills = data;
          this.slimLoadingBarService.complete();
        },
          err => {
            console.log(err);
            return false;

          });
          this.api.getHeroStat(this.id).subscribe(data => {
            this.herosstat = data;
            this.slimLoadingBarService.complete();
          },
            err => {
              console.log(err);
              return false;

            });
    });

  }

  getImage(hName,vert) {
    if(vert==true){
      return "http://cdn.dota2.com/apps/dota2/images/heroes/"+hName +"_vert.jpg"
    }
    else if(vert == false){
      return "http://cdn.dota2.com/apps/dota2/images/heroes/" + hName + "_lg.png"
    }
  }

  getName(name){
    var find = '_';
    var re = new RegExp(find, 'g');
    let s = name.replace(re, ' ');

    return s.charAt(0).toUpperCase()+s.slice(1);
  }
  getSkilImg(hName , sName) {
    var find = ' ';
    var re = new RegExp(find, 'g');
    let s = sName.replace(re, '_');
    s = s.replace("'",'');
    return  "http://cdn.dota2.com/apps/dota2/images/abilities/"+hName+"_"+s.toLowerCase()+"_lg.png";
  }


}
