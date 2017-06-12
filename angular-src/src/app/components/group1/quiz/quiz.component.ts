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
  itemall:any
  itemComponent:any
  itemNoComp:any
  componentOfitem:any
  x:number;
  y:number;
  z:number;
  listChoice:any;
  binaryCheck:Array<boolean>
  show:boolean
  result:String

  ans:Array<String>


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
    this.show = false
    this.binaryCheck = []
    this.itemall =[]
    this.listChoice = []
    this.itemNoComp = []
    this.componentOfitem =[]
    this.x=0
    this.y=0
    this.z=0
    this.itemComponent = []
    this.api.getItem().subscribe( data => {
      for (let key in data.itemdata) {
        if(key.search("river_painter")==-1&&key.search("dagon")==-1&&key.search("necronomicon")==-1
        &&key.search("travel_boots_2")==-1){
          this.itemall.push(data.itemdata[key])
          if(data.itemdata[key].components!=null){
            this.itemComponent.push(data.itemdata[key])
          }else{
            this.itemNoComp.push(key)
          }

        }

      }

      this.itemlist = data.itemdata;
      this.x = Math.floor((Math.random() * this.itemComponent.length) )
      this.y = Math.floor((Math.random() * this.itemNoComp.length) )
      this.z = Math.floor((Math.random() * this.itemNoComp.length) )
      this.listChoice = this.itemComponent[this.x].components
      this.listChoice.push(this.itemNoComp[this.y])
      this.listChoice.push(this.itemNoComp[this.z])
      this.shuffle(this.listChoice)
      this.listChoice.push('recipe')
      for (let key in this.listChoice) {
          this.binaryCheck.push(false)
      }
      this.binaryCheck.push(false)
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

  randomItem(){
    return this.itemComponent[this.x]
  }

  makeChoice(){
    return this.listChoice
  }

  check(num){
    if(this.binaryCheck[num]){
      this.binaryCheck[num] = false
    }else{
      this.binaryCheck[num] = true
    }
    console.log(this.binaryCheck)
  }

  shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
  }

  haveRecipe(){
    let costStart = this.itemComponent[this.x].cost;
    let sum = 0
    for (let key in this.itemComponent[this.x].components) {
        sum += this.itemall[key].cost
    }
    if(sum<costStart){
      return true
    }else{
      return false
    }

  }

  onSubmit(){
    this.show = true
    let arr = []
    for (let i = 0; i < this.listChoice.length; i++) {
        if(this.binaryCheck[i]){
          arr.push(this.listChoice[i])
        }
    }
    if(this.binaryCheck[this.binaryCheck.length-1]){
      arr.push('zzzzz')
    }
    let arrComp = this.itemComponent[this.x].components.sort()
    if(this.haveRecipe()){
      arrComp.push('zzzzz')
    }
    arr.sort()
    this.result = 'Correct'
    for (let i = 0; i < arrComp.length; i++) {
        if(arrComp[i]!=arr[i]){
          this.result = 'Incorrect'
        }
    }

  }

  getComponents(name){
  return "http://cdn.dota2.com/apps/dota2/images/items/"+name+"_lg.png"
  }



}
