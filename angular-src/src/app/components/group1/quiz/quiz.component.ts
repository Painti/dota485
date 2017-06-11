import { Component, OnInit ,ViewChild } from '@angular/core';
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
  itemComponent:any
  x:number;
  ans:Array<String>
  listChoice:Array<String>

  @ViewChild('autoShownModal') public autoShownModal:ModalDirective;
  public isModalShown:boolean = false;

  public showModal():void {
    this.isModalShown = true;
  }

  public hideModal():void {
    this.autoShownModal.hide();
  }

  public onHidden():void {
    this.isModalShown = false;
  }

  ngOnInit() {
    this.ans = []
    this.listChoice = []
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
     this.showModal();

  }



  getName(name){
    name = name.replace("?3"," ");
    return name
  }

  getNamelg(name){
    return name + "_lg.png"
  }

  getImage(name) {
    return "http://cdn.dota2.com/apps/dota2/images/items/" + name
  }

  randomItem(){
    console.log(JSON.stringify(this.itemComponent[this.x]))
    return this.itemComponent[this.x]
  }

  ansIn(name){

  }

  chenkAns(){

  }

  makeChoice(){
    

  }




}
