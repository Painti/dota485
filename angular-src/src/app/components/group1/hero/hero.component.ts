import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../services/get-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  constructor(
    private api: GetApiService,
    private route: ActivatedRoute,
    private router:Router,
    private slimLoadingBarService: SlimLoadingBarService
  ) { }
  heros: Object

  ngOnInit() {
    this.slimLoadingBarService.start();
    this.api.getHeroesList().subscribe(data => {
      this.heros = data["herodata"];
      this.slimLoadingBarService.complete();
    },
      err => {
        console.log(err);
        return false;

      });

  }
  getImage(hName) {
    return "http://cdn.dota2.com/apps/dota2/images/heroes/" + hName + "_lg.png"
  }
  gotodetial(name) {
    this.router.navigate(['/hero', name]);
  }
  getName(name){
    var find = '_';
    var re = new RegExp(find, 'g');
    let s = name.replace(re, ' ');
    return s.charAt(0).toUpperCase()+s.slice(1);
  }
}
