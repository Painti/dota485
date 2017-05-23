import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../../services/get-api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForObjectPipe } from '../../../pipes/ng-for-object.pipe';
import { ModalDirective } from 'ngx-bootstrap/modal';

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
  ngOnInit() {
    this.api.getItem().subscribe( data => {
      this.itemlist = data;
    },
     err => {
       console.log(err);
       return false;
     });

  }

  getName(name){
    name = name.replace("_"," ");
    return name.charAt(0).toUpperCase()+name.slice(1);
  }

  getImage(name){
    return "http://cdn.dota2.com/apps/dota2/images/items/"+name+"_lg.png"
  }

  combination(name){
    if(name.components){
      return "true"
    }
  }





}
