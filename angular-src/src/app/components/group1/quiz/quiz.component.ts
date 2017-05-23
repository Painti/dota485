import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../services/get-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForObjectPipe } from '../../../pipes/ng-for-object.pipe';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(
  private api: GetApiService,
  private route: ActivatedRoute
  ) { }
  itemlist:Object
  itemComponent:any
  x:number;
  ngOnInit() {
    this.x=0;
    this.itemComponent = []
    this.api.getItem().subscribe( data => {
      for (let key in data.itemdata) {
          if(data.itemdata[key].components!=null){
            this.itemComponent.push(data.itemdata[key])
          }
      }
      this.itemlist = data.itemdata;
      this.x = Math.floor((Math.random() * this.itemComponent.length) )
    },
     err => {
       console.log(err);
       return false;
     });



  }

  getName(name){
    return name.replace("item_", "");
  }

  getImage(hName) {
    return "http://cdn.dota2.com/apps/dota2/images/heroes/" + hName + "_lg.png"
  }

  randomItem(){
    console.log(JSON.stringify(this.itemComponent[this.x]))
    return this.itemComponent[this.x]
  }


}
