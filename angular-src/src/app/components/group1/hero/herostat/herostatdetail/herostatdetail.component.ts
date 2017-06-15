import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../../../services/get-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForObjectPipe } from '../../../../../pipes/ng-for-object.pipe';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-herostatdetail',
  templateUrl: './herostatdetail.component.html',
  styleUrls: ['./herostatdetail.component.css']
})
export class HerostatdetailComponent implements OnInit {

  constructor(
    private api: GetApiService,
    private route: ActivatedRoute,
    private router:Router,
    private slimLoadingBarService: SlimLoadingBarService
  ){ }
  heroesStat:Array<Object>
  result:Object
  id:string
  character:Object

  ngOnInit() {
    this.slimLoadingBarService.start();
    this.route.params.subscribe(params => {
      this.id = params['hero_name'];
      this.api.getHeroesStat().subscribe(data => {
        this.heroesStat = data

        for(let i =0;i<data.length;i++){
          if(this.getHeroName(data[i].name)==this.id){
            this.character = data[i]
          }
        }
      },
        err => {
          console.log(err);
          return false;
        })

        this.api.getHeroesStatBenchmarks(this.id).subscribe(data =>{
          this.result = data.result
          this.slimLoadingBarService.complete();
        })




    })
  }

  getHeroName(hName){
    hName = hName.replace("npc_dota_hero_","")
    return hName
  }

  getunderscoreoff(hName){
    hName = hName.replace("_"," ")
    return hName.charAt(0).toUpperCase()+hName.slice(1)
  }

  getImage(img) {
      return "https://api.opendota.com" + img
  }
  getValueName(name){
    name = name.replace("_per_","/")
    name = name.replace("_"," ")
    return name.charAt(0).toUpperCase()+name.slice(1)
  }

  getTwoPoint(value){
    value = value.toFixed(2)
    return value
  }

}
