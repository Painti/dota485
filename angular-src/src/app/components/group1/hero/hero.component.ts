import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../services/get-api.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  constructor(private api:GetApiService) { }
  hero:Array<Object>
  ngOnInit() {
    this.api.getHero().subscribe(data =>{
      this.hero = data
    }, err =>{
      console.log(err);
      return false;
    });
  }

}
