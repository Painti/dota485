import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../services/get-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  constructor(
    private api: GetApiService,
    private route: ActivatedRoute,
    private router:Router) { }
  heros: Object

  ngOnInit() {
    this.api.getHeroes().subscribe(data => {
      this.heros = data;
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
    name = name.replace("_"," ");

    return name.charAt(0).toUpperCase()+name.slice(1);
  }
}
