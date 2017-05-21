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
    return name.replace("item_", "");
  }



}
