import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../services/get-api.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  constructor(
    private api:GetApiService) {  }
    heros:Object

  ngOnInit() {
    this.api.getHeroes().subscribe(data =>{
      this.heros = data;
    },
    err =>{
        console.log(err);
        return false;

  });

}
  getImage(hName){
    return "http://cdn.dota2.com/apps/dota2/images/heroes/"+hName+"_lg.png"
  }
}
